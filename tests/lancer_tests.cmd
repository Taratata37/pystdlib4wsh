@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

set "failures=0"
set "total=0"

echo ================================
echo  Lancement des tests .wsf
echo ================================
echo  Ce script liste les fichiers .wsf présents et les exécute les uns après les autres.

for %%F in (test_*.wsf) do (
	set /a total+=1
	echo.
	echo ▶ Exécution de %%F
	cscript //nologo "%%F"
	if errorlevel 1 (
		echo ❌ Échec de %%F
		set /a failures+=1
	) else (
		echo ✅ Succès de %%F
	)
	echo --------------------------------
)

echo.
echo ================================
echo  Résumé :
echo --------------------------------
echo  Nombre de lots exécutés : %total%
echo  Nombre de lots en échec : %failures%
echo ================================
if %failures% gtr 0 (
    echo ⚠️ Certains tests ont échoué.
) else (
    echo 🎉 Tous les tests sont passés avec succès !
)

echo.
Echo Appuyez sur une touche pour quitter...
pause>nul
