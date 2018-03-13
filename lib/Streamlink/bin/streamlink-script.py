#!"C:\Program Files (x86)\Streamlink\Python\python.exe"
import sys, os
import site
installdir = os.path.dirname(os.path.dirname(__file__))
pkgdir = os.path.join(installdir, 'pkgs')
sys.path.insert(0, pkgdir)
# Ensure .pth files in pkgdir are handled properly
site.addsitedir(pkgdir)
os.environ['PYTHONPATH'] = pkgdir + os.pathsep + os.environ.get('PYTHONPATH', '')

# Allowing .dll files in Python directory to be found
os.environ['PATH'] += ';' + os.path.dirname(sys.executable)



if __name__ == '__main__':
    from streamlink_cli.main import main
    main()
