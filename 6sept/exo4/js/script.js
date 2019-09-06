/* 
Attendre le chargement du DOM
*/
document.addEventListener('DOMContentLoaded', () => {

    /* 
    Déclarations
    */
        const mainTag = document.querySelector('main');
        const formTag = document.querySelector('form');
        const postTitle = document.querySelector('[name="postTitle"]');
        const postBody = document.querySelector('[name="postBody"]');
    //

    /* 
    Méthodes/Functions
    */
        // Function asynchrone
        const asyncFetch = async (method, path, data = undefined) => {
            // Création d'une variable pour la requète
            let apiResponse;

            /*
            Mise en place du CRUD
            Requêtes Fetch POST/GET/PUT/DELETE
            */
                if( method === 'GET' ){ // Lire
                    apiResponse = await fetch(path);
                }
                else if( method === 'POST' || method === 'PUT' ){ // Ajouter || Editer
                    const options = {
                        method: method,
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    };
                    apiResponse = await fetch(path, options)
                }
                else if( method === 'DELETE' ){ // Supprimer
                    const options = {
                        method: 'DELETE',
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    };
                    apiResponse = await fetch(path , options)
                }
            //

            /*
            Vérifier le status de la requête
            */
                if( apiResponse.status === 200 || apiResponse.status === 201 ){
                    // Extraire les données de la requête
                    const jsonData = await apiResponse.json();
                    // Retourner une Promise
                    return Promise.resolve(jsonData);
                }
                else{
                    // Retourner une Promise
                    return Promise.reject(apiResponse);
                };
            //
        };

        // Fonction pour ajouter un article
        const addPost = () => {
            
            // Capter la soumission du formulaire
            formTag.addEventListener('submit', event => {
                
                // Bloquer le comportement du formulaire
                event.preventDefault();

                // Vérifier la présence de données dans le champs du formulaire
                if( postTitle.value.length > 0 && postBody.value.length > 0) {
                    // Ajouter un post
                    asyncFetch(
                        'POST', 
                        'https://jsonplaceholder.typicode.com/posts', 
                        { title: postTitle.value, body: postBody.value, userId: 1 }
                    )
                    .then( apiResponse => {
                        mainTag.innerHTML += `
                            <h2>${apiResponse.title}</h2>
                            <p>${apiResponse.body}</p>
                            <button id="backHome">Retour</button>
                        `;
                    })
                    .catch( apiError => {
                        console.error(apiError);
                    });
                }
            });
        };

        // Fonction poour afficher la liste de tous les articles
        const getAllPosts = () => {
            asyncFetch('GET', 'https://jsonplaceholder.typicode.com/posts')
            .then( apiResponse => displayPosts(apiResponse))
            .catch( apiError => {
                console.error(apiError)
            })
        };

        // Function pour créer la liste d'articles
        const displayPosts = data => {
            // Créer une liste HTML
            let postList = document.createElement('ul');

            // Boucle sur la collection data
            for( let item of data ){
                // Ajouter dans postList autant de LI que d'article
                postList.innerHTML += `
                    <li>
                        <h2>${item.title}</h2>
                        <button class="intButton readPost" post-id="${item.id}">Lire</button>
                        <button class="intButton deletePost" post-id="${item.id}">Supprimer</button>
                    </li>
                `;
            };

            // Ajouter la liste dans la balise MAIN
            mainTag.innerHTML = '';
            mainTag.appendChild(postList);

            // Capter le clic sur les boutons .readPost
            const intButtons = document.querySelectorAll('.intButton');
            for( let item of intButtons ) getButtonInnteraction(item);
        };

        // Fopnction pour afficher le contenu d'un article
        const displaySinglePost = post => {
            // Modifier le contenu de la balie MAIN
            mainTag.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button id="backHome">Retour</button>
            `;

            // Capter le click sur le buton #backHome
            document.querySelector('#backHome').addEventListener('click', () => {
                getAllPosts();
            });
        };

        // Fonction pour capter le clic sur les boutons
        const getButtonInnteraction = button => {
            button.addEventListener('click', () => {
                // Vérifier la présence d'une class
                if( button.classList.contains('readPost') ){
                    // Récupérer les données d'un article
                    asyncFetch('GET', `https://jsonplaceholder.typicode.com/posts/${button.getAttribute('post-id')}`)
                    .then( apiResponse => displaySinglePost(apiResponse))
                    .catch( apiError => {
                        console.error(apiError)
                    })
                }
                else{
                    // Supprimer un article
                    // Récupérer les données d'un article
                    asyncFetch('DELETE', `https://jsonplaceholder.typicode.com/posts/${button.getAttribute('post-id')}`)
                    .then( apiResponse => getAllPosts())
                    .catch( apiError => {
                        console.error(apiError)
                    })
                }
            });
        };
    //

    /* 
    Lancer l'IHM
    */
        getAllPosts();
        addPost();
    //
});
//