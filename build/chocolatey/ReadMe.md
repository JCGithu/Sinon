# Sinon Chocolatey Package

This is the build script for Sinon chocolatey package.

## Usage

To use install Sinon as a Chocolatey package, simply use:

```powershell
choco install Sinon
```

To uninstall Sinon:

```powershell
choco uninstall Sinon
```

## Build prerequisite

- Windows 7+, preferably Windows 10 machine
- [Chocolatey](https://chocolatey.org/)

## Build process

1. Upon new release, update the `sha256` hash and installer location in `chocolateyinstall.ps1`.
2. Update the version in `sinon.nuspec`.
3. Cd to `build/chocolatey`.
4. Run `choco pack` to package a new `.nupkg`.
5. Test the package locally with: `choco install Sinon -s .`
6. Once satisfied, push the package with `choco push`

