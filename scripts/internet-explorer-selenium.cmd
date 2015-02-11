REG ADD "HKLM\Software\Microsoft\Internet Explorer\MAIN\FeatureControl\FEATURE_HTTP_USERNAME_PASSWORD_DISABLE" /t REG_DWORD /v iexplore.exe /d 0 /f
REG ADD "HKCU\Software\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_HTTP_USERNAME_PASSWORD_DISABLE" /t REG_DWORD /v iexplore.exe /d 0 /f
REG ADD "HKLM\SOFTWARE\Wow6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE" /t REG_DWORD /v iexplore.exe /d 0 /f
