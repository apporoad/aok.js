#! /bin/sh

if   [[ $aok_type = "git" ]] || [[ $aok_type = 'zip' ]]; 
then 
echo 'node /aok/bin.js '$aok_path' -w /workspace/aok --type '$aok_type' '$aok_param'  -d -p 1154'
node /aok/bin.js $aok_path -w /workspace/aok --type $aok_type $aok_param  -d
else 
echo 'node /aok/bin.js  /api -s /static -p 1154'
node /aok/bin.js  /api -s /static -p 1154 
fi