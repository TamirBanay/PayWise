@echo off

echo.
echo Bundle %PROJECT_NAME% static content...
pushd refund-system\code\frontend\zeeksystem
cmd /c npm install
cmd /c npm run build

echo Copying %PROJECT_NAME% static content...
xcopy build ..\..\..\..\output\%PROJECT_NAME%\static\ /eqv
popd

exit /B 1
