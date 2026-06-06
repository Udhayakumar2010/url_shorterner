@echo off
:: Run this script as Administrator to reset MySQL root password to 'root'
:: Right-click this file and choose "Run as administrator"

echo === MySQL Root Password Reset ===
echo.
echo Stopping MySQL80 service...
net stop MySQL80

echo.
echo Starting MySQL without grant tables...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --skip-grant-tables --skip-networking &

echo Waiting 5 seconds for MySQL to start...
timeout /t 5 /nobreak

echo.
echo Resetting password...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root --connect-timeout=5 -e "FLUSH PRIVILEGES; ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'; FLUSH PRIVILEGES;"

echo.
echo Stopping temporary MySQL instance...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqladmin.exe" -u root -proot shutdown

echo.
echo Starting MySQL80 service normally...
net start MySQL80

echo.
echo === Done! MySQL root password is now 'root' ===
pause
