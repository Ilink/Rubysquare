function x(o,p,g){function h(d,b,c,i,k,r,s){var j=f();if(j){var m=0;if(i&&!k)m=i[0];m=0;if(i)m=i[1]-i[0]+1;if(typeof s==="undefined")s=true;if(b)if(typeof j.onload!="undefined")j.onload=function(){if(j.status=="200"||j.status=="206"){j.fileSize=r||j.getResponseHeader("Content-Length");b(j)}else c&&c();j=null};else j.onreadystatechange=function(){if(j.readyState==4){if(j.status=="200"||j.status=="206"){j.fileSize=r||j.getResponseHeader("Content-Length");b(j)}else c&&c();j=null}};j.open("GET",d,s);
j.overrideMimeType&&j.overrideMimeType("text/plain; charset=x-user-defined");i&&k&&j.setRequestHeader("Range","bytes="+i[0]+"-"+i[1]);j.setRequestHeader("If-Modified-Since","Sat, 1 Jan 1970 00:00:00 GMT");j.send(null)}else c&&c()}function f(){var d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest;else if(window.G)d=new ActiveXObject("Microsoft.XMLHTTP");return d}function e(d,b,c){var i=f();if(i){if(b)if(typeof i.onload!="undefined")i.onload=function(){if(i.status=="200")b(this);else c&&c();i=null};
else i.onreadystatechange=function(){if(i.readyState==4){if(i.status=="200")b(this);else c&&c();i=null}};i.open("HEAD",d,true);i.send(null)}else c&&c()}function a(d,b,c,i){function k(l){var n=~~(l[0]/c)-i;l=~~(l[1]/c)+1+i;if(n<0)n=0;if(l>=blockTotal)l=blockTotal-1;return[n,l]}function r(l,n){for(;t[l[0]];){l[0]++;if(l[0]>l[1])return n?n():s}for(;t[l[1]];){l[1]--;if(l[0]>l[1])return n?n():s}var u=[l[0]*c,(l[1]+1)*c-1];h(d,function(v){if(parseInt(v.getResponseHeader("Content-Length"),10)==b){l[0]=0;
l[1]=blockTotal-1;u[0]=0;u[1]=b-1}v={data:v.X||v.responseText,s:u[0]};for(var w=l[0];w<=l[1];w++)t[w]=v;j+=u[1]-u[0]+1;n&&n()},g,u,"bytes",s,!!n)}var s,j=0,m=new y("",0,b),t=[];c=c||2048;i=typeof i==="undefined"?0:i;blockTotal=~~((b-1)/c)+1;for(var q in m)if(m.hasOwnProperty(q)&&typeof m[q]==="function")this[q]=m[q];this.a=function(l){var n;r(k([l,l]));n=t[~~(l/c)];if(typeof n.data=="string")return n.data.charCodeAt(l-n.s)&255;else if(typeof n.data=="unknown")return IEBinary_getByteAt(n.data,l-n.s)};
this.O=function(){return j};this.g=function(l,n){r(k(l),n)}}(function(){e(o,function(d){d=parseInt(d.getResponseHeader("Content-Length"),10)||-1;p(new a(o,d))})})()}
function y(o,p,g){var h=o,f=p||0,e=0;this.Q=function(){return h};if(typeof o=="string"){e=g||h.length;this.a=function(a){return h.charCodeAt(a+f)&255}}else if(typeof o=="unknown"){e=g||IEBinary_getLength(h);this.a=function(a){return IEBinary_getByteAt(h,a+f)}}this.n=function(a,d){for(var b=Array(d),c=0;c<d;c++)b[c]=this.a(a+c);return b};this.k=function(){return e};this.d=function(a,d){return(this.a(a)&1<<d)!=0};this.R=function(a){a=this.a(a);return a>127?a-256:a};this.r=function(a,d){var b=d?(this.a(a)<<
8)+this.a(a+1):(this.a(a+1)<<8)+this.a(a);if(b<0)b+=65536;return b};this.T=function(a,d){var b=this.r(a,d);return b>32767?b-65536:b};this.h=function(a,d){var b=this.a(a),c=this.a(a+1),i=this.a(a+2),k=this.a(a+3);b=d?(((b<<8)+c<<8)+i<<8)+k:(((k<<8)+i<<8)+c<<8)+b;if(b<0)b+=4294967296;return b};this.S=function(a,d){var b=this.h(a,d);return b>2147483647?b-4294967296:b};this.q=function(a,d){var b=this.a(a),c=this.a(a+1),i=this.a(a+2);b=d?((b<<8)+c<<8)+i:((i<<8)+c<<8)+b;if(b<0)b+=16777216;return b};this.c=
function(a,d){for(var b=[],c=a,i=0;c<a+d;c++,i++)b[i]=String.fromCharCode(this.a(c));return b.join("")};this.e=function(a,d,b){a=this.n(a,d);switch(b.toLowerCase()){case "utf-16":case "utf-16le":case "utf-16be":var c=b;d=void 0;b=0;var i=1,k=0;d=Math.min(d||a.length,a.length);if(a[0]==254&&a[1]==255){c=true;b=2}else if(a[0]==255&&a[1]==254){c=false;b=2}if(c){i=0;k=1}c=[];for(var r=0;b<d;r++){var s=a[b+i],j=(s<<8)+a[b+k];b+=2;if(j==0)break;else if(s<216||s>=224)c[r]=String.fromCharCode(j);else{s=(a[b+
i]<<8)+a[b+k];b+=2;c[r]=String.fromCharCode(j,s)}}a=new String(c.join(""));a.f=b;a=a;break;case "utf-8":d=void 0;b=0;d=Math.min(d||a.length,a.length);if(a[0]==239&&a[1]==187&&a[2]==191)b=3;i=[];for(k=0;b<d;k++){c=a[b++];if(c==0)break;else if(c<128)i[k]=String.fromCharCode(c);else if(c>=194&&c<224){r=a[b++];i[k]=String.fromCharCode(((c&31)<<6)+(r&63))}else if(c>=224&&c<240){r=a[b++];j=a[b++];i[k]=String.fromCharCode(((c&255)<<12)+((r&63)<<6)+(j&63))}else if(c>=240&&c<245){r=a[b++];j=a[b++];s=a[b++];
c=((c&7)<<18)+((r&63)<<12)+((j&63)<<6)+(s&63)-65536;i[k]=String.fromCharCode((c>>10)+55296,(c&1023)+56320)}}a=new String(i.join(""));a.f=b;a=a;break;default:d=void 0;i=[];d=d||a.length;for(b=0;b<d;){k=a[b++];if(k==0)break;i[b-1]=String.fromCharCode(k)}a=new String(i.join(""));a.f=b;a=a;break}return a};this.N=function(a){return String.fromCharCode(this.a(a))};this.$=function(){return window.btoa(h)};this.M=function(a){h=window.atob(a)}};(function(o){o.l={i:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",z:function(p){for(var g="",h,f,e,a,d,b,c=0;c<p.length;){h=p[c++];f=p[c++];e=p[c++];a=h>>2;h=(h&3)<<4|f>>4;d=(f&15)<<2|e>>6;b=e&63;if(isNaN(f))d=b=64;else if(isNaN(e))b=64;g=g+Base64.i.charAt(a)+Base64.i.charAt(h)+Base64.i.charAt(d)+Base64.i.charAt(b)}return g}};o.Base64=o.l;o.l.encodeBytes=o.l.z})(this);(function(o){var p=o.t={},g={},h=[0,7];p.C=function(f,e,a){a=a||{};(a.dataReader||x)(f,function(d){d.g(h,function(){var b=d.c(4,7)=="ftypM4A"?ID4:d.c(0,3)=="ID3"?ID3v2:ID3v1;b.o(d,function(){var c=a.tags,i=b.p(d,c);c=g[f]||{};for(var k in i)if(i.hasOwnProperty(k))c[k]=i[k];g[f]=c;e&&e()})})})};p.A=function(f){if(!g[f])return null;var e={};for(var a in g[f])if(g[f].hasOwnProperty(a))e[a]=g[f][a];return e};p.B=function(f,e){if(!g[f])return null;return g[f][e]};o.ID3=o.t;p.loadTags=p.C;p.getAllTags=
p.A;p.getTag=p.B})(this);(function(o){var p=o.u={},g=["Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge","Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B","Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska","Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient","Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical","Instrumental","Acid","House","Game","Sound Clip","Gospel","Noise","AlternRock","Bass","Soul","Punk","Space","Meditative","Instrumental Pop","Instrumental Rock",
"Ethnic","Gothic","Darkwave","Techno-Industrial","Electronic","Pop-Folk","Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta","Top 40","Christian Rap","Pop/Funk","Jungle","Native American","Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer","Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro","Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock","National Folk","Swing","Fast Fusion","Bebob","Latin","Revival","Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock",
"Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band","Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson","Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus","Porn Groove","Satire","Slow Jam","Club","Tango","Samba","Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle","Duet","Punk Rock","Drum Solo","Acapella","Euro-House","Dance Hall"];p.o=function(h,f){var e=h.k();h.g([e-128-1,e],f)};p.p=function(h){var f=h.k()-128;if(h.c(f,3)=="TAG"){var e=h.c(f+3,30).replace(/\0/g,
""),a=h.c(f+33,30).replace(/\0/g,""),d=h.c(f+63,30).replace(/\0/g,""),b=h.c(f+93,4).replace(/\0/g,"");if(h.a(f+97+28)==0)var c=h.c(f+97,28).replace(/\0/g,""),i=h.a(f+97+29);else{c="";i=0}h=h.a(f+97+30);return{version:"1.1",title:e,artist:a,album:d,year:b,comment:c,track:i,genre:h<255?g[h]:""}}else return{}};o.ID3v1=o.u})(this);(function(o){function p(e,a){var d=a.a(e),b=a.a(e+1),c=a.a(e+2);return a.a(e+3)&127|(c&127)<<7|(b&127)<<14|(d&127)<<21}var g=o.H={};g.b={};g.frames={BUF:"Recommended buffer size",CNT:"Play counter",COM:"Comments",CRA:"Audio encryption",CRM:"Encrypted meta frame",ETC:"Event timing codes",EQU:"Equalization",GEO:"General encapsulated object",IPL:"Involved people list",LNK:"Linked information",MCI:"Music CD Identifier",MLL:"MPEG location lookup table",PIC:"Attached picture",POP:"Popularimeter",REV:"Reverb",
RVA:"Relative volume adjustment",SLT:"Synchronized lyric/text",STC:"Synced tempo codes",TAL:"Album/Movie/Show title",TBP:"BPM (Beats Per Minute)",TCM:"Composer",TCO:"Content type",TCR:"Copyright message",TDA:"Date",TDY:"Playlist delay",TEN:"Encoded by",TFT:"File type",TIM:"Time",TKE:"Initial key",TLA:"Language(s)",TLE:"Length",TMT:"Media type",TOA:"Original artist(s)/performer(s)",TOF:"Original filename",TOL:"Original Lyricist(s)/text writer(s)",TOR:"Original release year",TOT:"Original album/Movie/Show title",
TP1:"Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",TP2:"Band/Orchestra/Accompaniment",TP3:"Conductor/Performer refinement",TP4:"Interpreted, remixed, or otherwise modified by",TPA:"Part of a set",TPB:"Publisher",TRC:"ISRC (International Standard Recording Code)",TRD:"Recording dates",TRK:"Track number/Position in set",TSI:"Size",TSS:"Software/hardware and settings used for encoding",TT1:"Content group description",TT2:"Title/Songname/Content description",TT3:"Subtitle/Description refinement",
TXT:"Lyricist/text writer",TXX:"User defined text information frame",TYE:"Year",UFI:"Unique file identifier",ULT:"Unsychronized lyric/text transcription",WAF:"Official audio file webpage",WAR:"Official artist/performer webpage",WAS:"Official audio source webpage",WCM:"Commercial information",WCP:"Copyright/Legal information",WPB:"Publishers official webpage",WXX:"User defined URL link frame",AENC:"Audio encryption",APIC:"Attached picture",COMM:"Comments",COMR:"Commercial frame",ENCR:"Encryption method registration",
EQUA:"Equalization",ETCO:"Event timing codes",GEOB:"General encapsulated object",GRID:"Group identification registration",IPLS:"Involved people list",LINK:"Linked information",MCDI:"Music CD identifier",MLLT:"MPEG location lookup table",OWNE:"Ownership frame",PRIV:"Private frame",PCNT:"Play counter",POPM:"Popularimeter",POSS:"Position synchronisation frame",RBUF:"Recommended buffer size",RVAD:"Relative volume adjustment",RVRB:"Reverb",SYLT:"Synchronized lyric/text",SYTC:"Synchronized tempo codes",
TALB:"Album/Movie/Show title",TBPM:"BPM (beats per minute)",TCOM:"Composer",TCON:"Content type",TCOP:"Copyright message",TDAT:"Date",TDLY:"Playlist delay",TENC:"Encoded by",TEXT:"Lyricist/Text writer",TFLT:"File type",TIME:"Time",TIT1:"Content group description",TIT2:"Title/songname/content description",TIT3:"Subtitle/Description refinement",TKEY:"Initial key",TLAN:"Language(s)",TLEN:"Length",TMED:"Media type",TOAL:"Original album/movie/show title",TOFN:"Original filename",TOLY:"Original lyricist(s)/text writer(s)",
TOPE:"Original artist(s)/performer(s)",TORY:"Original release year",TOWN:"File owner/licensee",TPE1:"Lead performer(s)/Soloist(s)",TPE2:"Band/orchestra/accompaniment",TPE3:"Conductor/performer refinement",TPE4:"Interpreted, remixed, or otherwise modified by",TPOS:"Part of a set",TPUB:"Publisher",TRCK:"Track number/Position in set",TRDA:"Recording dates",TRSN:"Internet radio station name",TRSO:"Internet radio station owner",TSIZ:"Size",TSRC:"ISRC (international standard recording code)",TSSE:"Software/Hardware and settings used for encoding",
TYER:"Year",TXXX:"User defined text information frame",UFID:"Unique file identifier",USER:"Terms of use",USLT:"Unsychronized lyric/text transcription",WCOM:"Commercial information",WCOP:"Copyright/Legal information",WOAF:"Official audio file webpage",WOAR:"Official artist/performer webpage",WOAS:"Official audio source webpage",WORS:"Official internet radio station homepage",WPAY:"Payment",WPUB:"Publishers official webpage",WXXX:"User defined URL link frame"};var h={title:["TIT2","TT2"],artist:["TPE1",
"TP1"],album:["TALB","TAL"],year:["TYER","TYE"],comment:["COMM","COM"],track:["TRCK","TRK"],genre:["TCON","TCO"],picture:["APIC","PIC"],lyrics:["USLT","ULT"]},f=["title","artist","album","track"];g.o=function(e,a){e.g([0,p(6,e)],a)};g.p=function(e,a){var d=0,b=e.a(d+3);if(b>4)return{version:">2.4"};var c=e.a(d+4),i=e.d(d+5,7),k=e.d(d+5,6),r=e.d(d+5,5),s=p(d+6,e);d+=10;if(k){var j=e.h(d,true);d+=j+4}b={version:"2."+b+"."+c,major:b,revision:c,flags:{unsynchronisation:i,extended_header:k,experimental_indicator:r},
size:s};var m;if(i)m={};else{d=d;s=s-10;i=e;c=a;k={};r=b.major;j=[];for(var t=0,q;q=(c||f)[t];t++)j=j.concat(h[q]||[q]);for(c=j;d<s;){j=null;t=i;q=d;var l=null;switch(r){case 2:m=t.c(q,3);var n=t.q(q+3,true),u=6;break;case 3:m=t.c(q,4);n=t.h(q+4,true);u=10;break;case 4:m=t.c(q,4);n=p(q+4,t);u=10;break}if(m=="")break;d+=u+n;if(!(c.indexOf(m)<0)){if(r>2)l={message:{Z:t.d(q+8,6),L:t.d(q+8,5),W:t.d(q+8,4)},j:{U:t.d(q+8+1,7),I:t.d(q+8+1,3),K:t.d(q+8+1,2),F:t.d(q+8+1,1),w:t.d(q+8+1,0)}};q+=u;if(l&&l.j.w){p(q,
t);q+=4;n-=4}if(!(l&&l.j.F)){if(m in g.b)j=g.b[m];else if(m[0]=="T")j=g.b["T*"];j=j?j(q,n,t,l):undefined;j={id:m,size:n,description:m in g.frames?g.frames[m]:"Unknown",data:j};if(m in k){if(k[m].id)k[m]=[k[m]];k[m].push(j)}else k[m]=j}}}m=k}m=m;for(var v in h)if(h.hasOwnProperty(v)){a:{n=h[v];if(typeof n=="string")n=[n];u=0;for(d=void 0;d=n[u];u++)if(d in m){e=m[d].data;break a}e=void 0}if(e)b[v]=e}for(var w in m)if(m.hasOwnProperty(w))b[w]=m[w];return b};o.ID3v2=g})(this);(function(){function o(g){var h;switch(g){case 0:h="iso-8859-1";break;case 1:h="utf-16";break;case 2:h="utf-16be";break;case 3:h="utf-8";break}return h}var p=["32x32 pixels 'file icon' (PNG only)","Other file icon","Cover (front)","Cover (back)","Leaflet page","Media (e.g. lable side of CD)","Lead artist/lead performer/soloist","Artist/performer","Conductor","Band/Orchestra","Composer","Lyricist/text writer","Recording Location","During recording","During performance","Movie/video screen capture",
"A bright coloured fish","Illustration","Band/artist logotype","Publisher/Studio logotype"];ID3v2.b.APIC=function(g,h,f,e,a){a=a||"3";e=g;var d=o(f.a(g));switch(a){case "2":var b=f.c(g+1,3);g+=4;break;case "3":case "4":b=f.e(g+1,h-(g-e),d);g+=1+b.f;break}a=f.a(g,1);a=p[a];d=f.e(g+1,h-(g-e),d);g+=1+d.f;return{j:b.toString(),type:a,description:d.toString(),data:f.n(g,e+h-g)}};ID3v2.b.COMM=function(g,h,f){var e=g,a=o(f.a(g)),d=f.c(g+1,3),b=f.e(g+4,h-4,a);g+=4+b.f;g=f.e(g,e+h-g,a);return{language:d,Y:b.toString(),
text:g.toString()}};ID3v2.b.COM=ID3v2.b.COMM;ID3v2.b.PIC=function(g,h,f,e){return ID3v2.b.APIC(g,h,f,e,"2")};ID3v2.b.PCNT=function(g,h,f){return f.P(g)};ID3v2.b.CNT=ID3v2.b.PCNT;ID3v2.b["T*"]=function(g,h,f){var e=o(f.a(g));return f.e(g+1,h-1,e).toString()};ID3v2.b.TCON=function(){return ID3v2.b["T*"].apply(this,arguments).replace(/^\(\d+\)/,"")};ID3v2.b.TCO=ID3v2.b.TCON;ID3v2.b.USLT=function(g,h,f){var e=g,a=o(f.a(g)),d=f.c(g+1,3),b=f.e(g+4,h-4,a);g+=4+b.f;g=f.e(g,e+h-g,a);return{language:d,J:b.toString(),
V:g.toString()}};ID3v2.b.ULT=ID3v2.b.USLT})();(function(o){function p(f,e,a,d){var b=f.h(e,true);if(b==0)return d();var c=f.c(e+4,4);if(["moov","udta","meta","ilst"].indexOf(c)>-1){if(c=="meta")e+=4;f.g([e+8,e+8+8],function(){p(f,e+8,b-8,d)})}else f.g([e+(c in h.m?0:b),e+b+8],function(){p(f,e+b,a,d)})}function g(f,e,a,d,b){b=b===undefined?"":b+"  ";for(var c=a;c<a+d;){var i=e.h(c,true);if(i==0)return;var k=e.c(c+4,4);if(["moov","udta","meta","ilst"].indexOf(k)>-1){if(k=="meta")c+=4;g(f,e,c+8,i-8,b);return}if(h.m[k]){var r=e.q(c+16+1,true),s=
h.m[k];r=h.D[r];if(k=="trkn"){f[s[0]]=e.a(c+16+11);f.count=e.a(c+16+13)}else{k=c+16+4+4;var j=i-16-4-4;switch(r){case "text":f[s[0]]=e.e(k,j,"UTF-8");break;case "uint8":f[s[0]]=e.r(k);break;case "jpeg":case "png":f[s[0]]={j:"image/"+r,data:e.n(k,j)};break}}}c+=i}}var h=o.v={};h.D={"0":"uint8","1":"text","13":"jpeg","14":"png","21":"uint8"};h.m={"\u00a9alb":["album"],"\u00a9art":["artist"],"\u00a9ART":["artist"],aART:["artist"],"\u00a9day":["year"],"\u00a9nam":["title"],"\u00a9gen":["genre"],trkn:["track"],
"\u00a9wrt":["composer"],"\u00a9too":["encoder"],cprt:["copyright"],covr:["picture"],"\u00a9grp":["grouping"],keyw:["keyword"],"\u00a9lyr":["lyrics"],"\u00a9gen":["genre"]};h.o=function(f,e){f.g([0,7],function(){p(f,0,f.k(),e)})};h.p=function(f){var e={};g(e,f,0,f.k());return e};o.ID4=o.v})(this);
