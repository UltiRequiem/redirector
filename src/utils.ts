// https://github.com/UltiRequiem/ultirequiem.github.io

export function buildSite(url: string) {
  return `<!DOCTYPE html>
<html>
<head>
<title>ultirequiem.com</title>

<script type="module" defer>
const seconds = document.getElementById("seconds")

let counter=5;

setInterval(()=>{
    seconds.innerText = counter
    
    if (--counter === 0) {
      window.location.assign("${url}")
    }

}, 1000)

</script>

</head>

<body>
The new site is https://ultirequiem.com/
Redirecting you in <span id="seconds"> 5 </span>
</body>

</html>`;
}
