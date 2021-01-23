!macro customInstall
  CreateDirectory $LOCALAPPDATA\MCKEEPUREWATER
  CopyFiles $INSTDIR\kaka.sqlite3 $LOCALAPPDATA\MCKEEPUREWATER
  Delete $INSTDIR\kaka.sqlite3
!macroend