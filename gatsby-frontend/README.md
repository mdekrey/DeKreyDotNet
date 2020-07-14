This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
cra-universal was also added for SSR.

To build the docker image:

    npm run build-docker

To run the docker image locally:

    npm run start-docker

To deploy it to the kubernetes cluster, run the following in bash or powershell:

    docker push dekreydotnet.azurecr.io/dekreydotnet:latest
    kubectl -n dekrey-dot-net set image deployment dekrey-dot-net web=$(docker inspect --format='{{index .RepoDigests 0}}' dekreydotnet.azurecr.io/dekreydotnet:latest)

(Above command from https://github.com/kubernetes/kubernetes/issues/33664#issuecomment-426500710)