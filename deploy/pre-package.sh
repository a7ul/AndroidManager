#the script generated md5 for the file as what webpack file-loader does and then assigns the adb binary 755 permission
echo 'changing permission for bundled adb binary'
rawMD5Result=$(md5 app/bin/24/adb.osx.bin)
adbBinMD5=${rawMD5Result##*= }
chmod 755 bundle/${adbBinMD5}.bin
