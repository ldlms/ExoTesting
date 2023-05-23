<?php
    namespace App\Controller;
    use App\Utils\Fonctions;
    use App\Model\Utilisateur;
    class UtilisateurController extends Utilisateur{
        public function insertUser(){
            $msg = "";
            //Test si le formulaire à été submit
            if(isset($_POST['submit'])){
                //nettoyage des datas du formulaire
                $nom = Fonctions::cleanInput($_POST['nom']);
                $prenom = Fonctions::cleanInput($_POST['prenom']);
                $mail = Fonctions::cleanInput($_POST['mail']);
                $mdp = Fonctions::cleanInput($_POST['mdp']);
                //Test si tous les champs du formulaire sont remplis
                if(!empty($nom) AND !empty($prenom) AND !empty($mail) AND !empty($mdp)){
                    $this->setMail($mail);
                    //Récupération du compte
                    $user = $this->getUserByMail();
                    //Test si le compte n'existe pas en BDD
                    if(!$user){
                        //Set des valeurs et hash du mot de passe
                        $this->setNom($nom);
                        $this->setPrenom($prenom);
                        $this->setPassword(password_hash($mdp, PASSWORD_DEFAULT));
                        //Ajout du compte en BDD
                        $this->addUser();
                        $msg = "Le compte a été ajouté en BDD";
                    }
                    //Test sinon affiche une erreur
                    else{
                        $msg = "Les informations sont incorrectes";
                    }
                }
                else{
                    $msg = "Veuillez remplir tous les champs du formulaire";
                }
            }
            //Import de la vue
            include './App/Vue/vueAddUser.php';
        }

        public function connectUser(){
            $msg = "";
            if(isset($_POST['submit'])){
                $nom = Fonctions::cleanInput($_POST['nom']);
                $prenom = Fonctions::cleanInput($_POST['prenom']);
                $mail = Fonctions::cleanInput($_POST['mail']);
                $mdp = Fonctions::cleanInput($_POST['mdp']);
                if(!empty($nom) AND !empty($prenom) AND !empty($mail) AND !empty($mdp)){
                    $this->setMail($mail);
                    $this->setNom($nom);
                    $this->setPrenom($prenom);
                    $this->setPassword($mdp);
                    $data = $this->getUserByMail();
                    if($data){
                        if(password_verify($mdp, $data[0]->mdp)){
                            //Créer les super globales de Session
                            $_SESSION['connected'] = true;
                            $_SESSION['nom'] = $data[0]->nom;
                            $_SESSION['prenom'] = $data[0]->prenom;
                            $_SESSION['mail'] = $data[0]->mail;
                            $_SESSION['id'] = $data[0]->id;
                            $msg = "connexion réussie";
                        }else{
                        $msg = "Mauvais mot de passe";
                    }
                }   
                else{
                    $msg = "Compte inexistant";
                }
            }else{
                $msg = "veuillez remplir les différents champs du formulaire";
            }
        }
        include './App/Vue/ViewConnexion.php';
    }
    }
?>