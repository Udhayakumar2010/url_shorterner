@echo off
setlocal

:: ============================================================
:: Run URL Shortener Backend using Java directly (no Maven needed)
:: ============================================================

set JAVA_HOME=C:\Users\udhay\.antigravity-ide\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64
set JAVA=%JAVA_HOME%\bin\java.exe
set M2=%USERPROFILE%\.m2\repository
set APP_CLASSES=d:\url-shorterner\backend\target\classes
set APP_RESOURCES=d:\url-shorterner\backend\src\main\resources

:: Build classpath from all JARs in .m2 that the IDE already downloaded
set CP=%APP_CLASSES%;%APP_RESOURCES%

for /r "%M2%\org\springframework\boot\spring-boot-3.2.0" %%f in (*.jar) do (
    if not "%%~nf"=="*sources*" if not "%%~nf"=="*javadoc*" set CP=!CP!;%%f
)

echo Starting URL Shortener Backend...
echo Using Java: %JAVA%
echo.

"%JAVA%" ^
  -cp "%APP_CLASSES%;%APP_RESOURCES%" ^
  -Dspring.datasource.url="jdbc:mysql://localhost:3306/url_shortener?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true" ^
  -Dspring.datasource.username=root ^
  -Dspring.datasource.password=root ^
  com.urlshortener.UrlShortenerApplication

pause
