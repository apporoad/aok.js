## just do it

```bash
# install k8s helm nginx-ingress first
# clone this git repo
cd k8s
helm create aok-test

# edit aok-test compared to aok

# dry run 
helm install ./k8s/aok/ --dry-run --debug --set ingress.enabled=true

# just run with ingress
# if you dont use nginx-ingress ,plz add param : --set ingress.annotations[0]."kubernetes\.io/ingress\.class"=xxxx
# like :  helm install ./k8s/aok/ --set ingress.enabled=true,ingress.annotations[0]."kubernetes\.io/ingress\.class"=xxxx 
helm install ./k8s/aok/ --set ingress.enabled=true

# visit aok.com:xxxxx
# visit aok.com:xxxxx/data
# try modify
curl -H "Content-Type:application/json"   -X POST -d  '{"hello":"w"}'  http://aok.com:xxxx/data
# visit aok.com:xxxxx/data

# delete 
helm list
helm delete xxxx --purge

## here with pvc

kubectl get storageClass

helm install ./k8s/aok/ --dry-run --debug --set persistence.enabled=true,persistence.storageClass="xxxxxx",ingress.enabled=true



```