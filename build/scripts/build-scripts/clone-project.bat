@echo off

echo.
echo Cloning GIT repositories...
git clone --quiet --single-branch --branch main git@gitlab.com:ozbenacot/refund-system.git
echo.
echo Cleaning up development code from server...
pushd refund-system
rd ".git" /S /Q
popd

exit /B 1
