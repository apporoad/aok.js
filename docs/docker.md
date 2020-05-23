
## docker run 

```bash

#  first add /api and /static
docker run -d --name aok -p 1154:1154 -v /api:/api -v /static:/static apporoad/aok:1

```



## dockerfile
```bash

git clone https://github.com/apporoad/aok.js.git

cd aok.js

npm i

docker build -t apporoad/aok:1 .

docker run -d --name aok -p 1154:1154 apporoad/aok:1 

docker run -d --name aok2 -e aok_type=git -e aok_path="https://github.com/apporoad/pnote.git" -e aok_param="-r api -s static" -p 1154:1154 apporoad/aok:2 


docker run -d --name aok3 -e aok_type=zip -e aok_path="https://github.com/apporoad/pnote/blob/master/pnote.zip?raw=true" -e aok_param="-r api -s static" -p 1154:1154 apporoad/aok:2 

## just for test

docker run -d --name aoktest  -p 11540:1154 -v /home/rue/wp/aok.js:/aok apporoad/aok:2


#visit  http://localhost:1154
#visit  http://localhost:1154/data
```

## k8s

easy use here:

```bash
kubectl apply -f https://raw.githubusercontent.com/apporoad/aok.js/master/k8s/example/aok.yaml
kubectl apply -f https://raw.githubusercontent.com/apporoad/aok.js/master/k8s/example/ingress-aok.yaml

```

## howToMakeHelmChart

[here](./howToMakeHelmChart.md)

## helm


```bash
kubectl get storageClass

helm install ./k8s/aok/ --dry-run --debug --set persistence.enabled=true,persistence.storageClass="xxxxxx",ingress.enabled=true

```

