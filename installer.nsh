!macro customInstall
  CreateDirectory $LOCALAPPDATA\MCKEEPUREWATERPOS
  CopyFiles $INSTDIR\membership.sqlite3 $LOCALAPPDATA\MCKEEPUREWATERPOS
  Delete $INSTDIR\membership.sqlite3
!macroend