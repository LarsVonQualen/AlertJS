/**
 * AlertJS
 *
 * @author Lars von Qualen <lars@larsvonqualen.dk>
 * @license MIT License
 * @copyright Lars von Qualen 2013
 */

var AlertJS = (function (alertjs) {
    var preDomNotificationsTopStack = [];
    var preDomNotificationStack = [];
    var preDomAlertStack = [];
    var ready = false;
    var sounds = {
        sound1: {
            wav: "data:audio/wav;base64,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QR9wH6wexR4THjIefB2UHfYc/hxlHG4c2BvXG0kbRhvDGroaOBorGrEZohksGSIZsRibGDEYGRiyF5cXNRcUF8IWxxaGFmgWFhbwFZkVdRUkFQ8VRBQ1ChDn681+0xXP59AC0dzQNdJi0RbTNtL90y/TwdT702bVx9QV1orVuNZO1mHXBtcB2L/XqNh12E3ZJNnr2dHZjdp22iLbHNvF27vbXtxe3PXc+9yP3ZjdIN4z3rbex95B31Tf0N/l31fgd+Dk4PrgZ+GI4fHhFeJ54pXi9OIE4z/jauPC4+fjOORm5LTk2eQx5TXsiAspJs0gyCShIwIjuSMDIjMjUyGAIp4gnCEHIOgggB80IPgejx91Huke5R1PHmQdsB3cHB4dXRyPHNgb/RtYG3IbzxrmGlMaXBrZGdsZWxlfGeAY4BhsGGIY8BfoF3sXcRcJF/sWmRaJFiUWGRa7FagVTBUyFd0UxBR3FHUURhQrFN0TvRNzE1kTEhP8Eq8SUwzY7SXSDteZ00DUYNVM1FzW9NQM18vV2NfO1oHYmtcf2WPYtdkj2Una1tnj2onafts82xnc6duv3I/cSt0z3d/d0t1t3mXeA98E35Lfm98k4C3greC/4DvhSuG+4dbhROJb4s7i7uJR43Tj0uPz41TkdeTN5PXkUeV05cnl2eUO5jbmg+ax5vXmHOdh54jnyuev7VsLPSjVI94moyZAJZMmYiTsJccjGSUaIx0kgCJhI/UhrCJrIfEh2SBGIVAgmiC7H/sfMB9cH6Ueyh4fHjYelB2dHQodER2DHIIcARz4G38bcxv7GusaeBplGvMZ4hl5GWAZAxnsGIsYcBgVGPQXnxd/FykXCxe6FpkWTBZFFhQW+hW1FYQVQhUiFdoUuRQ9FEoN7e+p1DLYptXD1SXX89X616vWn9iD12DZhNgA2kzZmdoL2ijbw9q/23HbVdwh3OjcxtyA3WfdFN4L3qnepd4130LfzN/Z317gc+Dw4AThduGT4f/hHuKE4qTiDOMr443jsuMR5DXkjuS35AjlNeWI5bPlA+Yv5nnmouby5gznO+dl56bnz+cV6EHofein6OLoVO2YBpwixh+gIVYicSAjIs8fayFeH68g0R7DH1keJB/lHXgebh3eHfYcQx18HLQcAxwpHIYbnhsMGx0bmBqYGhwaGBqgGZgZLhkhGbgYsBhJGDkY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t/+8/7v/vv+//77/vv+8/7//vv/A/8D/xP/E/8b/yv/L/8r/x//H/8r/x//M/8j/yP/K/9T/z//P/9L/0//O/8//z//S/9P/0//S/9P/1//U/9j/2//W/9r/1v/W/9r/2//Y/9//2//c/+P/3//Y/9z/2//c/9v/2//f/+D/4P/g/+D/4P/j/+b/3//p/+P/4P/i/+T/6P/m/+D/3//e/9//4P/c/9//2v/k/+D/3//g/+b/5P/m/+b/3//f/9z/4P/g/+D/4v/j/+P/5v/i/97/4//e/+P/3//g/+b/5//k/+b/6P/n/+z/5//n/+z/7P/n/+v/6P/p/+v/8P/o/+n/6//n/+n/6//v/+3/8f/t//H/8f/z/+//9f/w//D/8f/w//H/6f/w/+n/8//0//H/9f/0//X/+P/x//D/9P/5//H/9//0//T/8P/x/+//7//x//j/AQAJAAkADwANABcAFAAeABwAHAAdACIAJAAmACYALgAxADIALAAqAC0AMAAyADUAOAA6ADwAOgA8AD0AOgA+AD4APAA+AEIAQABJAEYATABGAEEARQBJAEwATABKAEkASABKAE4ATgBNAE0ASgBPAE4ATQBVAFYAVQBaAFoAUgBXAFoAXgBZAFcAWgBaAF8AWwBbAFsAWgBZAFkAXQBaAFsAXQBXAFkAWwBZAF8AYQBeAGIAXwBfAGEAZQBhAF4AWwBZAF8AXgBeAGEAYwBeAFsAXwBeAGMAYQBiAGMAZQBmAGYAZgBlAGoAZwBfAGYAYgBeAFsAYQBdAFsAXQBfAF8AXQBbAFsAXwBbAF0AYwBjAGMAYQBiAFsAXQBXAFYAWgBaAFcAXQBaAF0AWwBWAF0AYQBaAFoAWwBZAFsAXwBeAFkAWwBeAFcAVgBTAE8AWQBXAFoAVgBXAFUAVQBeAE8AUQBPAFMAVgBSAFcAVQBWAFcAWQBWAFMAVwBVAFoAVgBPAE0AUQBPAE0ATgBTAEkATgBNAEoATgBJAEwATABNAEYASgBIAEUASABCAEUAQgBFADwAQABCADwAQAA+ADwANQA5ADkAOQA4ADkAOgA8ADoANgA1ADQAOAAwADIALQAyADIAMAAwADEALQAuADAALAAuAC0AKQAoACUAJAAlACYAIgAlACkAIgAkACUAIgAoACYAJgAgACIAJgAsACkAIgAkACQAKQAkACAAJgAhACEAJAAmACgAJAAiACYAJAAkACIAJAAgACYAKQApACgALgApACUAJQAlACUAIQAhACoAJQAgACIAIgAgABwAGgAcABkAGAAXABUAGAAYABwAGgAVABEAFQAQABAAEwANABEAEwATAA8ADAAJAAcACQAIAAkABQAIAAUACAAEAAsABwADAAUABQD//wcABwADAAcACQAEAAcABwAIAAMAAwAEAAEAAwD//wAAAQD8/wEAAwADAAAAAwAAAP//AQAAAP3/BwADAAQAAQABAPz/AQD9//3//f/4//n/AAAAAAEA/f///////f/9//v////4//3/AwAAAAEA/f/9//v/AAAEAPz//P/8//v/+f/4/wAA/f/9//z/+//8//n//P/8//v/+f/4//j/+P/3//P/9//w//X/8P/w//X/+P/4//f/+//9//3///////3//P/5//3//f8AAP3//f8EAAAABAD9//n///8AAPv/+////wEA/f8AAAEA/P/3//z////5//z//f8BAP//+//8/wAAAQD//wAA//////3/AAABAAMA//8AAPj////9//3/AAD9//3/AQD//wAAAwADAAAABQAFAAcABQD8//v/9//3//j/+f/9///////3//X/9f/3//X/+P/1//j//P/9/////f/8//z/+//9/wAA/f/8/wAA///9/////f////z//f///////f/8////BAD4//3///8AAPz/9//3//f/8P/s/+3/8f/4//P/8//w//P/7P/s//D/8f/n/+n/8f/r/+z/8//t/+//8//s//D/6f/p/+T/6P/t/+3/8f/s/+z/6//o/+n/5//m/+P/6P/m/+L/6P/m/+f/3//m/+P/5P/n/+b/5P/o/+v/4//m/+L/4//k/+L/3//i/+P/3//i/+L/4v/k/+b/4//m/9//3P/e/9v/4P/f/9z/3v/j/97/3P/e/97/3P/f/9z/2P/b/9z/3P/f/9z/2v/b/9T/1//W/9f/1v/Y/9T/0v/X/9f/1//a/9f/zv/T/8//zP/P/9D/0v/Q/8z/0P/M/8z/x//K/8v/xv/H/8z/zP/S/87/zv/S/8v/yP/L/8b/xP/M/8v/yv/L/8r/x//P/87/x//K/8b/xv/G/87/x//K/8b/wv/C/8P/xP/C/7//wP/D/8P/v//A/8T/v//A/77/vP+7/7z/uP+0/7j/uv+6/8D/tv++/7T/t/++/7z/vP+4/77/u/++/7v/vv/A/7//vP+6/7z/vP+3/7v/tP+2/7z/uP/A/7z/u/+2/77/u/+4/7f/u/+z/7L/tv+6/7f/s/+y/7H/sf+t/7P/t/+z/7r/t/+z/7j/t/+4/7j/t/+z/7b/uv+y/7H/sv+z/7j/s/+r/7P/sf+v/7T/sf+z/7H/tv+2/7H/sf+t/63/q/+x/7H/sf+x/7H/s/+t/6n/qf+t/63/q/+r/6v/sf+t/6r/s/+v/6f/qv+l/6b/qv+j/6L/rv+t/63/rv+u/6//qv+x/67/rf+q/6f/qv+t/63/rv+u/67/r/+y/6//sf+x/6v/r/+v/6//tv+y/6//r/+r/6r/qf+n/6b/qv+x/7T/sv+x/6//sv+y/6//sf+0/7f/sv+3/7v/uP+4/7P/s/+0/7f/tP+x/7P/rv+x/7H/s/+0/7f/rf+x/7L/r/+v/7H/r/+0/7P/sv+y/7T/sf+u/7H/r/+x/63/rv+u/7H/rv+r/63/rf+p/67/rf+x/63/qv+v/6//rf+v/7H/rf+u/63/qf+r/7H/rf+q/6v/q/+p/6v/qv+l/6P/pf+m/57/o/+i/6f/pf+n/6f/rf+n/6b/o/+r/6X/ov+h/57/of+j/6P/ov+e/57/n/+d/5v/mf+W/53/n/+d/5r/l/+V/5X/kv+O/4r/j/+O/47/kf+R/5H/jv+V/43/jv+R/5H/jf+N/5H/lv+S/5H/lv+R/5P/i/+N/47/if+S/47/lf+W/5X/l/+W/5v/l/+S/5P/lf+W/5H/lf+V/5n/mf+W/5X/lv+V/5X/k/+R/5f/mv+X/5L/lf+X/5r/k/+R/5X/kv+W/5n/l/+Z/5X/mv+d/57/lf+a/5n/mv+d/5n/mv+d/53/mf+X/5b/mf+Z/5r/k/+a/5b/l/+Z/5r/nv+e/53/mv+V/5L/kv+N/43/jf+S/4//jv+P/5L/k/+L/47/jv+O/5H/j/+R/5f/kv+V/5X/k/+X/5X/k/+W/5H/jv+T/5n/kv+W/5f/lv+S/5H/kf+W/5H/j/+S/5L/lv+T/5L/j/+R/5H/j/+R/43/jv+R/5X/k/+V/5b/lv+V/5n/lf+X/5P/l/+X/5v/n/+X/5n/k/+T/5b/lf+P/5H/j/+T/5X/mv+a/5//nv+d/6H/ov+e/57/n/+d/5//pv+h/6P/ov+f/6H/pf+j/6n/p/+m/6n/rf+t/67/q/+t/6//rf+v/6v/qf+p/7L/r/+r/6//rf+p/67/rv+t/67/r/+u/6v/rv+x/63/sf+n/6n/rv+v/6//sv+z/7P/t/+z/7b/t/+0/7L/uP+z/6//sv+v/67/tv+y/67/rf+y/6//tP+t/63/pv+q/6v/rv+t/6n/rv+t/67/qv+p/6X/pv+j/6L/pv+l/6L/qv+p/6f/pv+m/6f/pv+f/6H/pf+n/6f/p/+j/6L/pf+i/6b/pv+r/6X/of+j/6P/o/+i/6H/pf+e/6P/ov+i/5//pf+i/6L/o/+j/6X/m/+i/6L/nf+b/57/nf+e/6H/o/+f/6P/of+b/6H/mv+b/5r/nf+d/5//nv+b/5//mf+e/5f/mf+a/5n/lf+X/5//nv+a/5//n/+h/5//n/+a/5n/m/+e/6L/n/+e/6P/nf+d/5//mv+i/6P/nv+e/57/m/+f/5//of+b/5//nf+e/5//n/+f/6H/ov+i/57/nv+d/6X/of+e/57/mv+b/5n/nf+b/6P/of+h/5r/m/+d/57/m/+e/57/nf+f/57/n/+i/5v/mf+d/53/l/+X/5r/nf+d/5//n/+h/57/n/+d/6H/n/+h/6L/pf+i/6L/ov+j/6H/o/+h/6X/of+i/6X/n/+l/6b/pf+j/6L/qf+j/6X/pv+f/57/o/+i/6P/nv+e/5//o/+j/5//of+e/57/o/+l/6X/qv+l/6b/of+f/6P/n/+h/57/o/+i/5v/ov+n/6L/ov+f/5//pf+m/6P/p/+m/6f/rf+y/6v/rf+q/6b/pf+n/6H/qv+m/6f/rf+p/6n/rf+q/6r/rf+r/67/qv+t/63/rv+x/6r/q/+r/67/q/+p/6b/q/+r/63/r/+x/7P/q/+v/63/r/+n/6v/rf+y/6//q/+u/7H/tP+z/7b/sf+t/7L/s/+r/7L/s/+x/6//r/+3/7b/s/+z/7f/rv+z/7f/uP+4/7T/uP+3/6//tv+0/7T/s/+z/7b/tv+6/7r/uv+4/7f/tP+0/7r/uP+2/7z/uP+8/7r/vP+8/8L/v/++/77/vv+6/7v/w//A/8T/v//C/8L/u/+3/7r/uv+7/8D/xP+//8b/w//G/8f/xP/E/8T/w//G/8P/xv/C/8T/xv/E/8b/w/+//8f/xP/G/8f/x//H/8v/y//M/8z/yv/E/8v/yP/L/8r/z//I/8//x//H/8//yv/H/8b/xv/D/8L/yv/D/8T/wP/E/8P/x//D/8f/wv/G/8L/xv/D/77/wv/A/77/vv++/8P/u/+6/7r/t/+3/7j/u/+7/7//vP+4/7T/u/+6/7f/tP+4/7z/vP+8/7v/vP+4/7v/u/+0/7r/uv+3/7b/tv+4/7f/t/+z/7b/s/+z/6//t/+2/7T/tv+2/7f/tv+8/7P/sv+2/7b/sf+0/7r/sv+z/7H/r/+y/7H/uP+3/7j/t/+0/7z/u/+8/8D/uP+3/7j/tP+4/7b/tP+4/7r/uP+3/7f/u/+4/77/tv+4/7v/uv+4/77/uP++/7v/vP+2/7f/s/+4/7j/s/+z/7f/tv+7/7f/t/+3/7f/tP+y/7r/sf+3/7H/tP+2/7T/tv+2/7f/tv+0/6//sv+0/6//sf+u/6//r/+t/6v/rv+t/67/rf+u/63/rf+v/6r/pv+p/6n/pv+m/6L/n/+h/57/pf+n/6X/ov+i/6X/of+f/6H/nf+j/6H/of+d/57/o/+i/6L/ov+d/57/m/+f/6X/nv+h/6P/pf+b/6L/nv+e/5//nv+i/5v/pv+l/57/pf+l/6H/pv+e/6n/of+m/6X/qf+q/6f/pv+j/6H/qv+t/6f/pv+n/6b/pv+r/6L/p/+m/6f/o/+l/6H/pv+f/6H/pv+q/6r/rf+t/6r/qf+q/6n/pf+v/6n/pv+p/6f/rf+n/6n/o/+l/6H/ov+q/6n/o/+r/67/rv+u/67/rv+q/6v/rv+r/6n/rf+x/63/sf+t/6n/q/+r/6L/qf+n/6b/p/+n/7H/sf+q/7L/tv+y/7P/tP+z/7T/s/+0/7j/uP+4/7z/u/+6/7r/u/+3/7j/tv+4/7r/u/+7/7z/uP+8/77/vv+7/7v/vP+8/7//vv/C/7v/vP+8/7//vv++/7z/wv+8/77/t/+3/8L/v/++/7v/u/+3/7j/vP+8/77/u/+7/8L/wP+8/77/wv+7/7v/vP+6/7r/u/++/7//v/++/8D/vv+//7v/vv/C/7z/v/+8/8P/wP++/8D/v/+//7z/vv++/8L/w/++/8f/xv/G/8L/xP/D/8b/yP/I/8j/y//L/8j/y//P/8j/x//G/8f/x//H/8b/yv/K/8z/yv/I/8v/xP/I/8j/yv/L/8//y//P/9L/z//S/8//zP/M/8//0P/P/8z/0//Q/8//0P/Q/87/zP/O/8v/zP/O/8v/zP/L/8v/z//P/9P/zv/L/8v/y//Q/8z/z//O/9D/zP/O/87/zP/I/8j/zP/C/8T/w//I/8r/zP/L/8//zP/L/87/y//L/8b/xv/H/8b/yv/E/8r/xP/D/8D/wP++/77/vP+//7v/wP/A/8L/vP++/7v/uP+8/7v/tv+6/7z/vv+8/7z/tP+0/7T/sv+y/7H/r/+0/7P/sf+v/7L/uv+y/67/rv+t/6n/q/+r/7L/sv+u/7L/sv+y/7j/sv+2/7b/t/+0/7v/s/+4/7j/t/+y/7T/tv+y/7L/s/+0/7L/t/+z/7j/uP+y/7T/tP+z/7j/s/+z/7b/uP+4/77/tv+3/7L/uP+2/7b/s/+y/7r/t/+4/7z/uP+6/7j/uP+6/7f/uP+2/7f/uv+2/77/uP+6/7v/u/+6/7b/u/+6/7j/t/+6/7z/vv+7/77/vP+2/7r/u/+8/7f/wP/D/8D/vP+//8L/v/++/8P/wP/E/7//xP/D/7//xP/E/8L/vv+//7v/wP+8/77/v//C/77/xP/D/8r/x//I/8b/wv/D/8L/xP/D/8P/wv/D/8P/wv+//8P/wv/C/8T/wv/G/8P/x//M/8f/vP++/7//w/+//7//w//G/8b/xv/L/8j/xP/E/8r/w//E/8b/xv/L/8r/y//M/8z/y//L/8r/zP/M/8r/yP/L/9D/0v/P/8z/yv/Q/9T/0//W/9f/0v/U/9//3P/a/9f/1//W/9f/2v/a/9z/2P/Y/9z/2P/b/+L/2//c/+L/3P/g/9z/3v/g/+f/4v/m/+f/5//j/+P/5//k/+L/3v/g/+b/3//j/+j/5//m/+D/4P/g/9z/2//b/97/5P/i/+D/4P/e/9v/3P/b/+P/2v/c/9//4P/i/+L/4P/i/9v/2v/c/9//3P/a/+D/3//c/9z/3P/i/9//2v/a/9v/2v/c/9z/2//f/9v/1v/W/9j/1//W/9j/2P/a/9j/3v/c/97/3v/c/97/3P/b/9b/3P/a/9r/4P/c/97/4v/Y/9z/3v/c/9//3P/e/9z/3//c/+L/2v/Y/9v/2P/a/9r/2P/b/9j/2//X/9v/1v/Y/9T/2//W/9j/1v/W/9T/0//e/9r/3P/Y/9//3v/e/9//3//c/9b/3P/b/9r/3P/b/9r/2v/Y/9v/3P/c/9v/3v/g/+P/4//j/97/4v/g/9z/2//e/9v/3P/Y/97/2v/i/9//2//e/+D/3//e/+L/3P/e/9//2//g/+D/4//e/9v/4P/e/9//2//Y/9j/4P/c/+L/2v/a/9j/1//a/9T/0//Y/9T/1v/W/9r/0P/Q/9P/0//Q/87/zv/M/9P/0//S/8//0v/Q/87/zP/M/8r/x//H/8f/zP/K/8v/x//I/8f/w//M/8P/x//K/87/yP/P/8z/zP/M/8z/yP/I/8f/yv/L/8r/zP/P/9L/z//L/8//zP/L/8v/z//Q/9T/0v/Q/9b/0P/W/9D/0//Q/8z/0v/Q/9L/1v/T/9b/0v/T/9P/0v/S/9P/0v/O/9D/1v/W/9D/0v/S/9P/0v/U/9D/1v/T/9P/1P/Q/9P/1P/M/8//zP/K/9D/0P/P/87/zP/S/9T/1v/U/9b/1P/S/9P/0//Q/9P/1v/U/9r/2P/X/9T/1P/W/9P/1v/a/9D/0//Y/9v/2//c/9v/3P/Y/9j/1v/X/9T/1v/W/9T/3P/W/9L/z//O/9D/1P/Q/87/0P/Q/9D/0v/T/9P/1P/O/8//0//U/9D/1P/O/9D/1//X/9P/1v/Q/9T/1P/O/9D/1v/Y/9P/2v/b/9f/2//b/9r/1v/U/9j/TElTVEoAAABJTkZPSUNSRAwAAAAyMDA5LTA2LTA1AABJRU5HDAAAAEphc29uIFZpbmUAAElTRlQWAAAAU29ueSBTb3VuZCBGb3JnZSA5LjAAAA=="
        }
    };
    var settings = {
        sound: false
    };
    
    alertjs.Init = function (callback) {
        $("body").prepend($("<div />").addClass("alertjs-audio-players").css("display", "none"));
        $("body").prepend($("<div />").addClass("alertjs-notifications-top"));
        $("body").append($("<div />").addClass("alertjs-notifications"));
        ready = true;
        callback(preDomNotificationStack, preDomNotificationsTopStack, preDomAlertStack);
    };
    
    alertjs.Settings = function (newSettings) {
        if (settings === undefined) {
            return settings;
        } else {
            settings = newSettings;
        }
    };
    
    var PlaySound = function () {
        var player = $("<audio />").attr("autoplay", "autoplay")
        .append($("<source />").attr("src", sounds.sound1.wav).attr("type", "audio/wav"))
        .append($("<embed />").attr("hidden", "true").attr("autostart", "true").attr("loop", "false").attr("src", sounds.sound1.wav));
        
        $(".alertjs-audio-players").append(player);
        setTimeout(function () {
            player.remove();
        }, 5000);
    };
    
    alertjs.Notify = (function (notify) {
        var generateCloseButton = function () {
            var btn = $("<a />").addClass("alertjs-close")
            .attr("href", "javascript:void();")
            .html("x")
            .on("click", function (event) {
                event.preventDefault();
                $(this).parent().fadeOut();
            });
            
            return btn;
        };
        
        var generateNotification = function (title, message, type, sound) {
            var notification = $("<div />").addClass("alertjs")
            .addClass("alertjs-notification")
            .addClass("alertjs-" + type)
            .append(generateCloseButton)
            .append(
                $("<h1 />").html(title)
            )
            .append(
                $("<p />").html(message)
            );
            
            if (settings.sound == true || sound == true) { 
                PlaySound();
            }
            
            setTimeout(function () {
                notification.fadeOut();
            }, 10000);
            
            return notification;
        };
        
        notify.addNotification = function (title, message, type, sound) {
            sound = typeof sound !== 'undefined' ? sound : settings.sound;
            
            if (!ready) {
                preDomNotificationStack.push({
                    title: title,
                    message: message,
                    type: type,
                    sound: sound
                });
            } else {
                $(document).find(".alertjs-notifications").append(generateNotification(title, message, type, sound).fadeIn());
            }
        };
        
        notify.Error = function (title, message, sound) {
            notify.addNotification(title, message, "error", sound);
        };
        
        notify.Info = function (title, message, sound) {
            notify.addNotification(title, message, "info", sound);
        };
        
        notify.Warning = function (title, message, sound) {
            notify.addNotification(title, message, "warning", sound);
        };
        
        notify.Success = function (title, message, sound) {
            notify.addNotification(title, message, "success", sound);
        };
        
        notify.Top = (function (top) {
            var generateCloseButton = function () {
                var btn = $("<a />").addClass("alertjs-close-btn")
                .attr("href", "javascript:void();")
                .html("x")
                .on("click", function (event) {
                    event.preventDefault();
                    $(this).parent().fadeOut();
                });
                
                return btn;
            };
            
            var generateNotification = function (title, message, type, sound) {
                var notification = $("<div />").addClass("alertjs")
                .addClass("alertjs-notification-top")
                .addClass("alertjs-" + type)
                .append(generateCloseButton)
                .append($("<div />").append($("<h1 />").html(title)).append($("<p />").html(message)).addClass("alertjs-message"));
                
                if (settings.sound == true || sound == true) { 
                    PlaySound();
                }
                
                setTimeout(function () {
                    notification.fadeOut();
                }, 10000);
                
                return notification;
            };
            
            top.addNotification = function (title, message, type, sound) {
                sound = typeof sound !== 'undefined' ? sound : settings.sound;
                
                if (!ready) {
                    preDomNotificationsTopStack.push({
                        title: title,
                        message: message,
                        type: type,
                        sound: sound
                    });
                } else {
                    $(document).find(".alertjs-notifications-top").append(generateNotification(title, message, type, sound).fadeIn());
                }
            };
            
            top.Error = function (title, message, sound) {
                top.addNotification(title, message, "error", sound);
            };
            
            top.Info = function (title, message, sound) {
                top.addNotification(title, message, "info", sound);
            };
            
            top.Warning = function (title, message, sound) {
                top.addNotification(title, message, "warning", sound);
            };
            
            top.Success = function (title, message, sound) {
                top.addNotification(title, message, "success", sound);
            };
            
            return top;
        })(notify.Top || {});
        
        return notify;
    })(alertjs.Notify || {});
    
    alertjs.Alert = (function (alert) {
        var showOverlay = function () {
            $("body").append($("<div />").addClass("alertjs-overlay"));
        };
        
        var hideOverlay = function () {
            $("body").find(".alertjs-overlay").fadeOut();
        };
        
        var generateConfirmBtn = function (confirmCallback) {
            var btn = $("<a />").addClass("alertjs-confirmBtn").attr("href", "javascript:void();").html("O.K").on("click", function (event) {
                event.preventDefault();
                
                typeof confirmCallback === 'function' && confirmCallback();
                
                $(this).parent().parent().fadeOut();
                hideOverlay();
            });
            
            var wrapper = $("<div />").addClass("alertjs-confirmBtn-wrapper").append(btn);
            
            return wrapper;
        };
        
        var generateAlert = function (title, message, type, confirmCallback, sound) {
            var alert = $("<div />").addClass("alertjs")
            .addClass("alertjs-alert")
            .addClass("alertjs-" + type)
            .append(
                $("<h1 />").html(title)
            )
            .append(
                $("<p />").html(message)
            )
            .append(generateConfirmBtn);
            
            if (settings.sound == true || sound == true) { 
                PlaySound();
            }
            
            return alert;
        };
        
        alert.addAlert = function (title, message, type, confirmCallback, sound) {
            sound = typeof sound !== 'undefined' ? sound : settings.sound;
            
            if (!ready) {
                preDomAlertStack.push({
                    title: title,
                    message: message,
                    type: type,
                    callback: confirmCallback,
                    sound: sound
                });
            } else {
                showOverlay();
                $("body").append(generateAlert(title, message, type, confirmCallback, sound).show());
            }
        };
        
        alert.Error = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "error", confirmCallback, sound);
        };
        
        alert.Info = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "info", confirmCallback, sound);
        };
        
        alert.Warning = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "warning", confirmCallback, sound);
        };
        
        alert.Success = function (title, message, confirmCallback, sound) {
            alert.addAlert(title, message, "success", confirmCallback, sound);
        };
        
        return alert;
    })(alertjs.Alert || {});
    
    $(document).ready(function () {
        alertjs.Init(function (notifications, notificationsTop, alerts) {
            for (i = 0; i < notifications.length; i++) {
                var notification = notifications[i];
                alertjs.Notify.addNotification(notification.title, notification.message, notification.type, notification.sound);
            }
            
            for (i = 0; i < notificationsTop.length; i++) {
                var notification = notificationsTop[i];
                alertjs.Notify.Top.addNotification(notification.title, notification.message, notification.type, notification.sound);
            }
            
            for (i = 0; i < alerts.length; i++) {
                var alert = alerts[i];
                alertjs.Alert.addAlert(alert.title, alert.message, alert.type, alert.callback, alert.sound);
            }
        });
    });
    
    return alertjs;
})(AlertJS || {});