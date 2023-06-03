@echo off

echo.
echo Copying server files...
xcopy refund-system\code\backend\server\mysite output\%PROJECT_NAME%\server\ /eqv
echo Copying env file for lab [%ENV_FILE%]...
copy refund-system\build\env\%ENV_FILE% output\%PROJECT_NAME%\server\.env
exit /B 1
