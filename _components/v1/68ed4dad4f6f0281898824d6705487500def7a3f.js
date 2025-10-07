var z=Object.defineProperty;var R=(s,i)=>()=>(s&&(i=s(s=0)),i);var P=(s,i)=>{for(var u in i)z(s,u,{get:i[u],enumerable:!0})};var M,W,X,j,q,K,J,Q,Z,$,ee,te,oe,ne,re,ie,ae,se,ue,le,ce,fe,S,me,de,pe,ve,ge,he,a,Se,Le,_e,we,k=R(()=>{M=window.__GLOBALS__.React,{Children:W,cloneElement:X,Component:j,createContext:q,createElement:K,createFactory:J,createRef:Q,forwardRef:Z,Fragment:$,isValidElement:ee,lazy:te,memo:oe,Profiler:ne,PureComponent:re,startTransition:ie,StrictMode:ae,Suspense:se,useCallback:ue,useContext:le,useDebugValue:ce,useDeferredValue:fe,useEffect:S,useId:me,useImperativeHandle:de,useInsertionEffect:pe,useLayoutEffect:ve,useMemo:ge,useReducer:he,useRef:a,useState:Se,useSyncExternalStore:Le,useTransition:_e,version:we}=window.__GLOBALS__.React});function C(s,i){Object.assign(s,{[Symbol.for("figma.react.props")]:i})}var be,xe,Re,Ce,ye,Ee,Te,ke,Oe,Pe,Fe,Be,Ne,Ue,Ie,Ge,Ye,De,Ve,ze,He,Me,We,Xe,je,qe,Ke,Je,Qe,Ze,$e,et,tt,ot,nt,O=R(()=>{be=window.__GLOBALS__.React,{Children:xe,cloneElement:Re,Component:Ce,createContext:ye,createElement:Ee,createFactory:Te,createRef:ke,forwardRef:Oe,Fragment:Pe,isValidElement:Fe,lazy:Be,memo:Ne,Profiler:Ue,PureComponent:Ie,startTransition:Ge,StrictMode:Ye,Suspense:De,useCallback:Ve,useContext:ze,useDebugValue:He,useDeferredValue:Me,useEffect:We,useId:Xe,useImperativeHandle:je,useInsertionEffect:qe,useLayoutEffect:Ke,useMemo:Je,useReducer:Qe,useRef:Ze,useState:$e,useSyncExternalStore:et,useTransition:tt,version:ot}=window.__GLOBALS__.React;nt=window.__GLOBALS__.React.forwardRef(function({children:i,renderText:u,renderTextCharacter:f,renderTextLine:m,renderTextWord:d,style:L,childrenStyles:l,onClick:g,onMouseEnter:p,onMouseLeave:_,onMouseDown:w,onMouseUp:A},v){let h=window.__GLOBALS__.React,t=window.__GLOBALS__.NewRenderHooksContext,e=h.useContext(t),o={};u&&(o.renderText=u),f&&(o.renderTextCharacter=f),m&&(o.renderTextLine=m),d&&(o.renderTextWord=d),v&&(o.nodeRef=v),L&&(o.style=L),l&&(o.childrenStyles=l),g&&(o.onClick=g),w&&(o.onMouseDown=w),A&&(o.onMouseUp=A),p&&(o.onMouseEnter=p),_&&(o.onMouseLeave=_);let r=e.cloneWithAdditionalHooks(o);return h.createElement(t.Provider,{value:r},i)})});var it,c,y,x=R(()=>{({Fragment:it,jsx:c,jsxs:y}=window.__GLOBALS__.ReactJSXRuntime)});var U={};P(U,{default:()=>F});function F({speed:s=1,lineCount:i=10,amplitude:u=.15,yOffset:f=.15}){let m=a(null),d=a(null),L=a(Date.now()),l=a(null),g=a(null),p=a({}),_=`
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `,w=`
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uSpeed;
    uniform float uLineCount;
    uniform float uAmplitude;
    uniform float uYOffset;

    // Use a constant upper bound for the loop
    const float MAX_LINES = 20.0;

    // Create a wavy line (0.0 black, 1.0 white)
    float wave(vec2 uv, float speed, float yPos, float thickness, float softness) {
      float falloff = smoothstep(1., 0.5, abs(uv.x));
      float y = falloff * sin(iTime * speed + uv.x * 10.0) * yPos - uYOffset;
      return 1.0 - smoothstep(thickness, thickness + softness + falloff * 0.0, abs(uv.y - y));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.y;
      vec4 col = vec4(0.0, 0.0, 0.0, 1.0);

      // Background gradient
      vec3 gradCol1 = vec3(0.2, 0.1, 0.0);
      vec3 gradCol2 = vec3(0.2, 0.0, 0.2);
      col.xyz = mix(gradCol1, gradCol2, uv.x + uv.y);

      // Center uv coords
      uv -= 0.5;
      
      // Wave colors to interpolate between 
      const vec3 col1 = vec3(0.2, 0.5, 0.9);
      const vec3 col2 = vec3(0.9, 0.3, 0.9);

      // Used to antialias the lines based on display pixel density
      float aaDy = iResolution.y * 0.000005;
      
      for (float i = 0.; i < MAX_LINES; i += 1.) {
        // Only process if within our desired line count
        if (i <= uLineCount) {
          float t = i / (uLineCount - 1.0);
          vec3 lineCol = mix(col1, col2, t);
          float bokeh = pow(t, 3.0);
          float thickness = 0.003;
          float softness = aaDy + bokeh * 0.2;
          float amp = uAmplitude - 0.05 * t;
          float amt = max(0.0, pow(1.0 - bokeh, 2.0) * 0.9);
          col.xyz += wave(uv, uSpeed * (1.0 + t), uAmplitude, thickness, softness) * lineCol * amt;
        }
      }

      gl_FragColor = col;
    }
  `,A=()=>{let t=m.current;if(!t)return!1;let e=t.getContext("webgl")||t.getContext("experimental-webgl");if(!e)return console.error("WebGL not supported"),!1;l.current=e;let o=e.createShader(e.VERTEX_SHADER);if(e.shaderSource(o,_),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))return console.error("Vertex shader compilation error:",e.getShaderInfoLog(o)),!1;let r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,w),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))return console.error("Fragment shader compilation error:",e.getShaderInfoLog(r)),!1;let n=e.createProgram();if(e.attachShader(n,o),e.attachShader(n,r),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))return console.error("Shader program linking error:",e.getProgramInfoLog(n)),!1;e.useProgram(n),g.current=n;let E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E);let T=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);let b=e.getAttribLocation(n,"a_position");return e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0),p.current={iResolution:e.getUniformLocation(n,"iResolution"),iTime:e.getUniformLocation(n,"iTime"),uSpeed:e.getUniformLocation(n,"uSpeed"),uLineCount:e.getUniformLocation(n,"uLineCount"),uAmplitude:e.getUniformLocation(n,"uAmplitude"),uYOffset:e.getUniformLocation(n,"uYOffset")},!0},v=()=>{let t=m.current,e=l.current;if(!t||!e)return;let o=t.clientWidth,r=t.clientHeight;(t.width!==o||t.height!==r)&&(t.width=o,t.height=r,e.viewport(0,0,e.canvas.width,e.canvas.height))},h=()=>{let t=l.current,e=g.current,o=p.current;if(!t||!e)return;let n=(Date.now()-L.current)/1e3;t.uniform2f(o.iResolution,t.canvas.width,t.canvas.height),t.uniform1f(o.iTime,n),t.uniform1f(o.uSpeed,s),t.uniform1f(o.uLineCount,i),t.uniform1f(o.uAmplitude,u),t.uniform1f(o.uYOffset,f),t.drawArrays(t.TRIANGLES,0,6),d.current=requestAnimationFrame(h)};return S(()=>{if(A())return v(),h(),window.addEventListener("resize",v),()=>{window.removeEventListener("resize",v),d.current&&cancelAnimationFrame(d.current)}},[]),S(()=>{let t=l.current,e=p.current;t&&e.uSpeed&&(t.uniform1f(e.uSpeed,s),t.uniform1f(e.uLineCount,i),t.uniform1f(e.uYOffset,f),t.uniform1f(e.uAmplitude,u))},[s,i,u,f]),c("div",{className:"relative rounded-2xl size-full","data-name":"video-container",children:c("div",{className:"relative size-full",children:y("div",{className:"box-border content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip p-0 relative size-full",children:[c("canvas",{ref:m,className:"absolute top-0 left-0 w-full h-full",style:{display:"block"}}),c("div",{className:"aspect-[1072/605] relative shrink-0 w-full","data-name":"YouTube"})]})})})}var I=R(()=>{k();O();x();C(F,{speed:{label:"Speed",type:"number",defaultValue:1,control:"slider",min:1,max:3,step:.01},lineCount:{label:"Line Count",type:"number",defaultValue:10,min:1,max:20,step:1},amplitude:{label:"Amplitude",type:"number",defaultValue:.15,min:0,max:.5,step:.01},yOffset:{label:"Y Offset",type:"number",defaultValue:.15,min:-1,max:1,step:.01}})});var G={};P(G,{default:()=>B});function B({speed:s=1,lineCount:i=10,amplitude:u=.15,yOffset:f=.15}){let m=a(null),d=a(null),L=a(Date.now()),l=a(null),g=a(null),p=a({}),_=`
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `,w=`
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uSpeed;
    uniform float uLineCount;
    uniform float uAmplitude;
    uniform float uYOffset;

    // Use a constant upper bound for the loop
    const float MAX_LINES = 20.0;

    // Create a wavy line (0.0 black, 1.0 white)
    float wave(vec2 uv, float speed, float yPos, float thickness, float softness) {
      float falloff = smoothstep(1., 0.5, abs(uv.x));
      float y = falloff * sin(iTime * speed + uv.x * 10.0) * yPos - uYOffset;
      return 1.0 - smoothstep(thickness, thickness + softness + falloff * 0.0, abs(uv.y - y));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.y;
      vec4 col = vec4(0.0, 0.0, 0.0, 1.0);

      // Background gradient
      vec3 gradCol1 = vec3(0.2, 0.1, 0.0);
      vec3 gradCol2 = vec3(0.2, 0.0, 0.2);
      col.xyz = mix(gradCol1, gradCol2, uv.x + uv.y);

      // Center uv coords
      uv -= 0.5;
      
      // Wave colors to interpolate between 
      const vec3 col1 = vec3(0.2, 0.5, 0.9);
      const vec3 col2 = vec3(0.9, 0.3, 0.9);

      // Used to antialias the lines based on display pixel density
      float aaDy = iResolution.y * 0.000005;
      
      for (float i = 0.; i < MAX_LINES; i += 1.) {
        // Only process if within our desired line count
        if (i <= uLineCount) {
          float t = i / (uLineCount - 1.0);
          vec3 lineCol = mix(col1, col2, t);
          float bokeh = pow(t, 3.0);
          float thickness = 0.003;
          float softness = aaDy + bokeh * 0.2;
          float amp = uAmplitude - 0.05 * t;
          float amt = max(0.0, pow(1.0 - bokeh, 2.0) * 0.9);
          col.xyz += wave(uv, uSpeed * (1.0 + t), uAmplitude, thickness, softness) * lineCol * amt;
        }
      }

      gl_FragColor = col;
    }
  `,A=()=>{let t=m.current;if(!t)return!1;let e=t.getContext("webgl")||t.getContext("experimental-webgl");if(!e)return console.error("WebGL not supported"),!1;l.current=e;let o=e.createShader(e.VERTEX_SHADER);if(e.shaderSource(o,_),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))return console.error("Vertex shader compilation error:",e.getShaderInfoLog(o)),!1;let r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,w),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))return console.error("Fragment shader compilation error:",e.getShaderInfoLog(r)),!1;let n=e.createProgram();if(e.attachShader(n,o),e.attachShader(n,r),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))return console.error("Shader program linking error:",e.getProgramInfoLog(n)),!1;e.useProgram(n),g.current=n;let E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E);let T=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);let b=e.getAttribLocation(n,"a_position");return e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0),p.current={iResolution:e.getUniformLocation(n,"iResolution"),iTime:e.getUniformLocation(n,"iTime"),uSpeed:e.getUniformLocation(n,"uSpeed"),uLineCount:e.getUniformLocation(n,"uLineCount"),uAmplitude:e.getUniformLocation(n,"uAmplitude"),uYOffset:e.getUniformLocation(n,"uYOffset")},!0},v=()=>{let t=m.current,e=l.current;if(!t||!e)return;let o=t.clientWidth,r=t.clientHeight;(t.width!==o||t.height!==r)&&(t.width=o,t.height=r,e.viewport(0,0,e.canvas.width,e.canvas.height))},h=()=>{let t=l.current,e=g.current,o=p.current;if(!t||!e)return;let n=(Date.now()-L.current)/1e3;t.uniform2f(o.iResolution,t.canvas.width,t.canvas.height),t.uniform1f(o.iTime,n),t.uniform1f(o.uSpeed,s),t.uniform1f(o.uLineCount,i),t.uniform1f(o.uAmplitude,u),t.uniform1f(o.uYOffset,f),t.drawArrays(t.TRIANGLES,0,6),d.current=requestAnimationFrame(h)};return S(()=>{if(A())return v(),h(),window.addEventListener("resize",v),()=>{window.removeEventListener("resize",v),d.current&&cancelAnimationFrame(d.current)}},[]),S(()=>{let t=l.current,e=p.current;t&&e.uSpeed&&(t.uniform1f(e.uSpeed,s),t.uniform1f(e.uLineCount,i),t.uniform1f(e.uYOffset,f),t.uniform1f(e.uAmplitude,u))},[s,i,u,f]),c("div",{className:"relative rounded-2xl size-full","data-name":"video-container",children:c("div",{className:"relative size-full",children:y("div",{className:"box-border content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip p-0 relative size-full",children:[c("canvas",{ref:m,className:"absolute top-0 left-0 w-full h-full",style:{display:"block"}}),c("div",{className:"aspect-[1072/605] relative shrink-0 w-full","data-name":"YouTube"})]})})})}var Y=R(()=>{k();O();x();C(B,{speed:{label:"Speed",type:"number",defaultValue:1,control:"slider",min:1,max:3,step:.01},lineCount:{label:"Line Count",type:"number",defaultValue:10,min:1,max:20,step:1},amplitude:{label:"Amplitude",type:"number",defaultValue:.15,min:0,max:.5,step:.01},yOffset:{label:"Y Offset",type:"number",defaultValue:.15,min:-1,max:1,step:.01}})});var D={};P(D,{default:()=>N});function N({speed:s=1,lineCount:i=10,amplitude:u=.15,yOffset:f=.15}){let m=a(null),d=a(null),L=a(Date.now()),l=a(null),g=a(null),p=a({}),_=`
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
    }
  `,w=`
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;
    uniform float uSpeed;
    uniform float uLineCount;
    uniform float uAmplitude;
    uniform float uYOffset;

    // Use a constant upper bound for the loop
    const float MAX_LINES = 20.0;

    // Create a wavy line (0.0 black, 1.0 white)
    float wave(vec2 uv, float speed, float yPos, float thickness, float softness) {
      float falloff = smoothstep(1., 0.5, abs(uv.x));
      float y = falloff * sin(iTime * speed + uv.x * 10.0) * yPos - uYOffset;
      return 1.0 - smoothstep(thickness, thickness + softness + falloff * 0.0, abs(uv.y - y));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.y;
      vec4 col = vec4(0.0, 0.0, 0.0, 1.0);

      // Background gradient
      vec3 gradCol1 = vec3(0.2, 0.1, 0.0);
      vec3 gradCol2 = vec3(0.2, 0.0, 0.2);
      col.xyz = mix(gradCol1, gradCol2, uv.x + uv.y);

      // Center uv coords
      uv -= 0.5;
      
      // Wave colors to interpolate between 
      const vec3 col1 = vec3(0.2, 0.5, 0.9);
      const vec3 col2 = vec3(0.9, 0.3, 0.9);

      // Used to antialias the lines based on display pixel density
      float aaDy = iResolution.y * 0.000005;
      
      for (float i = 0.; i < MAX_LINES; i += 1.) {
        // Only process if within our desired line count
        if (i <= uLineCount) {
          float t = i / (uLineCount - 1.0);
          vec3 lineCol = mix(col1, col2, t);
          float bokeh = pow(t, 3.0);
          float thickness = 0.003;
          float softness = aaDy + bokeh * 0.2;
          float amp = uAmplitude - 0.05 * t;
          float amt = max(0.0, pow(1.0 - bokeh, 2.0) * 0.9);
          col.xyz += wave(uv, uSpeed * (1.0 + t), uAmplitude, thickness, softness) * lineCol * amt;
        }
      }

      gl_FragColor = col;
    }
  `,A=()=>{let t=m.current;if(!t)return!1;let e=t.getContext("webgl")||t.getContext("experimental-webgl");if(!e)return console.error("WebGL not supported"),!1;l.current=e;let o=e.createShader(e.VERTEX_SHADER);if(e.shaderSource(o,_),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))return console.error("Vertex shader compilation error:",e.getShaderInfoLog(o)),!1;let r=e.createShader(e.FRAGMENT_SHADER);if(e.shaderSource(r,w),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))return console.error("Fragment shader compilation error:",e.getShaderInfoLog(r)),!1;let n=e.createProgram();if(e.attachShader(n,o),e.attachShader(n,r),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS))return console.error("Shader program linking error:",e.getProgramInfoLog(n)),!1;e.useProgram(n),g.current=n;let E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E);let T=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);let b=e.getAttribLocation(n,"a_position");return e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0),p.current={iResolution:e.getUniformLocation(n,"iResolution"),iTime:e.getUniformLocation(n,"iTime"),uSpeed:e.getUniformLocation(n,"uSpeed"),uLineCount:e.getUniformLocation(n,"uLineCount"),uAmplitude:e.getUniformLocation(n,"uAmplitude"),uYOffset:e.getUniformLocation(n,"uYOffset")},!0},v=()=>{let t=m.current,e=l.current;if(!t||!e)return;let o=t.clientWidth,r=t.clientHeight;(t.width!==o||t.height!==r)&&(t.width=o,t.height=r,e.viewport(0,0,e.canvas.width,e.canvas.height))},h=()=>{let t=l.current,e=g.current,o=p.current;if(!t||!e)return;let n=(Date.now()-L.current)/1e3;t.uniform2f(o.iResolution,t.canvas.width,t.canvas.height),t.uniform1f(o.iTime,n),t.uniform1f(o.uSpeed,s),t.uniform1f(o.uLineCount,i),t.uniform1f(o.uAmplitude,u),t.uniform1f(o.uYOffset,f),t.drawArrays(t.TRIANGLES,0,6),d.current=requestAnimationFrame(h)};return S(()=>{if(A())return v(),h(),window.addEventListener("resize",v),()=>{window.removeEventListener("resize",v),d.current&&cancelAnimationFrame(d.current)}},[]),S(()=>{let t=l.current,e=p.current;t&&e.uSpeed&&(t.uniform1f(e.uSpeed,s),t.uniform1f(e.uLineCount,i),t.uniform1f(e.uYOffset,f),t.uniform1f(e.uAmplitude,u))},[s,i,u,f]),c("div",{className:"relative rounded-2xl size-full","data-name":"video-container",children:c("div",{className:"relative size-full",children:y("div",{className:"box-border content-stretch flex flex-col gap-2.5 items-start justify-start overflow-clip p-0 relative size-full",children:[c("canvas",{ref:m,className:"absolute top-0 left-0 w-full h-full",style:{display:"block"}}),c("div",{className:"aspect-[1072/605] relative shrink-0 w-full","data-name":"YouTube"})]})})})}var V=R(()=>{k();O();x();C(N,{speed:{label:"Speed",type:"number",defaultValue:1,control:"slider",min:1,max:3,step:.01},lineCount:{label:"Line Count",type:"number",defaultValue:10,min:1,max:20,step:1},amplitude:{label:"Amplitude",type:"number",defaultValue:.15,min:0,max:.5,step:.01},yOffset:{label:"Y Offset",type:"number",defaultValue:.15,min:-1,max:1,step:.01}})});var gt=()=>Promise.resolve().then(()=>(I(),U)),ht=()=>Promise.resolve().then(()=>(Y(),G)),St=()=>Promise.resolve().then(()=>(V(),D));export{St as Code0,gt as Code1,ht as Code2};
