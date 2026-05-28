# Charts

## Principe

J'ai intégré nativement dans l'environnement REACT de DISPLAY la librairie **chart.js**

La doc est ici [doc Chart.js](https://www.chartjs.org/docs/latest/)

A été installée par npm `npm install chart.js`

Pour que la librairie soit exposée aux 'models' dans leur fichier title.js j'ai dû modifier main.tx en ajoutant ceci :
<pre>
// pour exposer chart.js au shadow dom
import Chart from 'chart.js/auto'
declare global {
  interface Window {
    Chart: typeof Chart;
  }
}
window.Chart = Chart;
// fin pour exposer chart.js au shadow dom
</pre>

**Je ne suis pas sûr que ce soit une bonne idée. On verra à l'usage**


## Exemple d'utilisation dans un model de title

<pre>
function findShadowRoot(element) {
    if (!element) return null;
    if (element.shadowRoot) return element.shadowRoot;
    for (const child of element.children) {
        const sr = findShadowRoot(child);
        if (sr) return sr;
    }
    return null;
}


(function() {
    const host = document.querySelector('.vl_model_{ **>>>nom du dossier du model<<<**  }');
    const shadow = findShadowRoot(host);
    if (!shadow) return;
    
    
    // Si pas encore, observe le shadow root
    const observer = new MutationObserver((mutations, obs) => {
      const canvas = shadow.getElementById('my-chart');
      if (!canvas) return;
      // Vérifie si le chart existe déjà
      if (canvas._chart) {
        canvas._chart.destroy();
        canvas._chart = null;
      }

      const zerrendak = shadow.getElementById('HBCharts-zerrendak-container');
      
      const labels = [];
      const values = [];
      const colors = [];
      const baseH = 20; // teinte de base (orange)
      const baseS = 60; // saturation
      const baseL = 55; // luminosité fixe
      const numShades = zerrendak.children.length;

      Array.from(zerrendak.children).forEach((zerrenda, i) => {
        const hautagaia = zerrenda.querySelector('.hautagaia')
        const bozkaKopurua = zerrenda.querySelector('.bozkaKopurua')
        labels.push(hautagaia.innerText)
        values.push(Number(bozkaKopurua.innerText))

        // on répartit la teinte sur 360° pour bien différencier
        const H = (baseH + i * (200 / numShades)) % 200
        colors.push(`hsl(${H}, ${baseS}%, ${baseL}%)`)
      });


      canvas._chart = new window.Chart(canvas.getContext('2d'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: colors
          }]
        },
        options:{
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: 0
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 25,
                padding: 10,
                font:{
                  size:25,
                }
              }
            }
          },
          radius: '280', // rayon du camembert par rapport au canvas
          
        }
        
      });
    });
  
    observer.observe(shadow, { childList: true, subtree: true });
  })();
  
</pre>