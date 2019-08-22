DeKrey.Net has so far been manually deployed, sorry the "charts" folder was a tease.

# Basic namespace

    kubectl create namespace basic

WARNING: I was having issues running the following command, [similar issues as others have had](https://github.com/jetstack/cert-manager/issues/1255). I added the version number to bypass, as described in the ticket.

    helm install --namespace basic --name letsencrypt stable/cert-manager --set ingressShim.defaultIssuerName=letsencrypt-staging --set ingressShim.defaultIssuerKind=ClusterIssuer --version 0.5.2
    helm install --name nginx stable/nginx-ingress --namespace basic

# DeKrey-Dot-Net namespace

    kubectl create namespace dekrey-dot-net

Setting up the container registry:

    az ad sp create-for-rbac --scopes /subscriptions/<Subscription ID>/resourcegroups/<ResourceGroup>/providers/Microsoft.ContainerRegistry/registries/<ContainerRegistry> --role Reader --name image-reader

Using the output there, then run this:

    kubectl create secret docker-registry <secret-name> --docker-server "<ContainerRegistry>.azurecr.io" --docker-username=<appId> --docker-password <password> -n dekrey-dot-net

Then:

    kubectl create -n dekrey-dot-net -f ./templates/deployment.yaml
    kubectl create -n dekrey-dot-net -f ./templates/ingress.yaml
    kubectl create -n dekrey-dot-net -f ./templates/service.yaml
    kubectl create -n dekrey-dot-net -f ./templates/web-certificate.yaml
    kubectl create -n dekrey-dot-net -f ./templates/production-issuer.yaml

