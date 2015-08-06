/**
 * Created by asus1 on 2015/7/21.
 */
var n =20,
    m = 200,
    layer = [], i,j;
var g = [];
var maxn,minn;
var w = 960, h = 500;
for (i=0;i<n;i++){
    layer[i+1]=bumpLayer(m);
}
for (i=0;i<m;i++) {
    g[i] =0;
    for (j=0;j<n;j++){
       g[i]+=(n-j)*layer[j+1][i];
    }
    g[i]=g[i]*-1.0/(n+1);
}
layer[0] = g;
for(i=1;i<=n;i++) {
    for(j=0;j<m;j++){
        layer[i][j] = layer[i-1][j]+layer[i][j];
    }
}
maxn = max(layer[n],function(d) {
   return d;
});
minn = min(layer[0],function(d) {
    return d;
});
var body = document.getElementsByTagName("body");
var svg = document.createElementNS('http://www.w3.org/2000/svg',"svg");
svg.setAttribute("height",h);
svg.setAttribute("width",w);
body[0].appendChild(svg);
for(i=0;i<n;i++){
    var str = "M"+0+","+scale(minn,maxn,0,h,layer[i][0]);
    for(j=1;j<m;j++)
    {
        str+="L"+scale(0,m-1,0,w,j)+","+scale(minn,maxn,0,h,layer[i][j]);
    }
    for(j=m-1;j>=0;j--)
    {
        str+="L"+scale(0,m-1,0,w,j)+","+scale(minn,maxn,0,h,layer[i+1][j]);
    }
    str+="Z";
    var path = document.createElementNS('http://www.w3.org/2000/svg',"path");
    path.setAttribute("d",str);
    path.style.fill = "rgb(0,0,"+Math.floor(Math.random()*256)+")";
    svg.appendChild(path);
}


function bumpLayer(n) {

    function bump(a) {
        var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
    }

    var a = [], i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < 5; ++i) bump(a);
    return a.map(function(d, i) { return  Math.max(0, d); });
}


function max(data,fun) {
    var maxn = fun(data[0]);
    for(var i=0;i<data.length;i++){
        maxn=Math.max(maxn,fun(data[i]));
    }
    return maxn;
}

function min(data,fun){
    var minn = fun(data[0]);
    for(var i=0;i<data.length;i++){
        minn = Math.min(minn,fun(data[i]))
    }
    return minn;
}

function scale(a1,b1,a2,b2,s)
{
    return (b2-a2)/(b1-a1)*(s-a1)+a2;
}