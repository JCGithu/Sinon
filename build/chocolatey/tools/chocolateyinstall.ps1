$ErrorActionPreference = 'Stop';
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$url        = 'https://github.com/JCGithu/Sinon/releases/download/v.1.3/Sinon.Setup.1.3.0.exe'

$packageArgs = @{
  packageName   = $env:ChocolateyPackageName
  unzipLocation = $toolsDir
  fileType      = 'exe'
  url           = $url
  file         = $fileLocation

  softwareName  = 'Sinon*'

  checksum      = '7AEEBBD40CCAA7B5D4B155944444A94D9E183492400738A18444F0B487A389A3'
  checksumType  = 'sha256'

  validExitCodes= @(0, 3010, 1641)
  silentArgs   = '/S /ALLUSERS=1 /ADDDESKTOPICON=1 /ADDSTARTMENU=1'
}

Install-ChocolateyPackage @packageArgs
