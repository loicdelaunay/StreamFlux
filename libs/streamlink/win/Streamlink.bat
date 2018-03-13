@echo off
chcp 65001 >NUL
set PYTHONIOENCODING=cp65001

set CMD_INVOKED=YES
set NO_CMD_HINTS=NO
set LAST_EXIT_CODE=0
set "STREAMLINK_ARGS=%*"

SETLOCAL EnableDelayedExpansion

:Main
	if exist "%~dp0\NO_CMD_HINTS" (
		set NO_CMD_HINTS=YES
	)

	if "!NO_CMD_HINTS!" == "NO" (
		if "!STREAMLINK_ARGS!" == "" (
			set CMD_INVOKED=NO
			title Streamlink for Windows
			cls
			echo Welcome to Streamlink for Windows
			echo Type a valid commmand:
			echo.
			set /p STREAMLINK_ARGS=""
		)
	)

	call:LaunchStreamlink

	if "!NO_CMD_HINTS!" == "NO" (
		if "!CMD_INVOKED!" == "NO" (
			set "EXTRA_ARGS="
			:WHILE_LOOP
				echo.
				echo Type another command or EXIT to end:
				echo.
				set /p EXTRA_ARGS=""
				if "!EXTRA_ARGS:exit=EXIT!" == "EXIT" (
					exit /B !LAST_EXIT_CODE!
				) else (
					set STREAMLINK_ARGS=!EXTRA_ARGS!
					call:LaunchStreamlink
				)
			goto :WHILE_LOOP
		)
	)

	exit /B !LAST_EXIT_CODE!
	GOTO:EOF

:LaunchStreamlink
	if "!CMD_INVOKED!" == "NO" (
		cls
	)
	set "STREAMLINK_VERSION="
	if exist "%~dp0\VERSION.txt" (
		set /p STREAMLINK_VERSION=<"%~dp0\VERSION.txt"
	)

	if "!NO_CMD_HINTS!" == "NO" (
		if "%STREAMLINK_VERSION%" == "" (
			echo [Streamlink for Windows]
		) else (
			echo [Streamlink for Windows %STREAMLINK_VERSION%]
		)
	)

	set STREAMLINK_INVOKE_CHK=!STREAMLINK_ARGS:streamlink=STREAMLINK!
	set STREAMLINK_INVOKE_CHK=!STREAMLINK_INVOKE_CHK:streamlink.exe=STREAMLINK!
	set STREAMLINK_INVOKE_CHK=!STREAMLINK_INVOKE_CHK:streamlink.bat=STREAMLINK!
	if "!STREAMLINK_INVOKE_CHK:~0,11!"=="STREAMLINK " (
		set STREAMLINK_ARGS=!STREAMLINK_ARGS:streamlink =!
		set STREAMLINK_ARGS=!STREAMLINK_ARGS:streamlink.exe =!
		set STREAMLINK_ARGS=!STREAMLINK_ARGS:streamlink.bat =!
	)

	set ERRORLEVEL=
	"%~dp0\Python 3.6.3\python.exe" "%~dp0\Streamlink\Streamlink.py" --ffmpeg-ffmpeg "%~dp0\Streamlink\Dependencies\ffmpeg\ffmpeg.exe" --rtmp-rtmpdump "%~dp0\Streamlink\Dependencies\rtmpdump\rtmpdump.exe" --config "%~dp0\streamlinkrc" !STREAMLINK_ARGS! --no-version-check
	set LAST_EXIT_CODE=!ERRORLEVEL!

	if "!NO_CMD_HINTS!" == "NO" (
		echo [End of Streamlink for Windows with ExitCode !LAST_EXIT_CODE!]
	)