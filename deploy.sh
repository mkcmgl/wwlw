#!/bin/bash

project_name="iot-web"

# server="10.221.19.216"
# password="bsjxcpb!QKL216"
# project_dir="/mnt/datadisk/bip/web"

server="10.221.19.219"
password="bsjxcpb!Test219"
project_dir="/data/web"

# 在本地打包
yarn prod

zip -r "${project_name}.zip" dist/

sshpass -p "${password}" scp -P 22022 "${project_name}.zip" root@"${server}":"${project_dir}" 

sshpass -p "${password}" ssh -o StrictHostKeyChecking=no root@"${server}" -p 22022 "
	cd ${project_dir}
	ls -hl
	rm -rf ${project_name}
	unzip -o ${project_name}.zip
	mv dist ${project_name}
	ls -hl
	rm -rf ${project_name}.zip
"