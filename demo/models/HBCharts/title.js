(function(shadow) {
  const buildChart = () => {
      const canvas = shadow.getElementById('my-chart');
      if (!canvas) return;

      // Détruit l'ancien chart si existant
      if (canvas._chart) {
          canvas._chart.destroy();
          canvas._chart = null;
      }

      const zerrendak = shadow.getElementById('HBCharts-zerrendak-container');
      if (!zerrendak) return;

      const labels = [];
      const values = [];
      const colors = [];
      const baseH = 20; // teinte de base (orange)
      const baseS = 60; 
      const baseL = 55; 
      const numShades = zerrendak.children.length;

      Array.from(zerrendak.children).forEach((zerrenda, i) => {
          const hautagaia = zerrenda.querySelector('.hautagaia');
          if (!hautagaia) return;
          const hautagaiaAbizen = hautagaia.textContent.match(/\b\p{Lu}+\b/gu) || [];
          const hautagaiaTrim = hautagaiaAbizen.slice(0,15).join("");
          
          const bozkaKopurua = zerrenda.querySelector('.bozkaKopurua');
          const bozkaEhunekoa = zerrenda.querySelector('.bozkaEhunekoa');
          const balekoakEl = shadow.querySelector(".balekoak");
          if (!balekoakEl || !bozkaKopurua || !bozkaEhunekoa) return;
          const balekoak = Number(balekoakEl.innerText);

          labels.push(`${hautagaiaTrim} - ${bozkaKopurua.innerText} - ${bozkaEhunekoa.textContent} %`);
          values.push(Number(bozkaKopurua.innerText));

          // Teinte répartie
          const H = (baseH + i * (200 / numShades)) % 200;
          colors.push(`hsl(${H}, ${baseS}%, ${baseL}%)`);
      });

      const font = getComputedStyle(shadow.host).getPropertyValue('--font3').trim();

      canvas._chart = new window.Chart(canvas.getContext('2d'), {
          type: 'pie',
          data: { labels, datasets: [{ data: values, backgroundColor: colors }] },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: { padding: 0 },
              plugins: {
                  legend: {
                      position: 'top',
                      align: 'start',
                      labels: {
                          color: '#111245',
                          boxWidth: 25,
                          boxHeight: 18,
                          padding: 10,
                          font: { 
                            family: font,
                            size: 28,
                            lineHeight: 1.3
                            }
                      }
                  }
              }
          }
      });
  };

  buildChart();

  // Observe mutations pour reconstruire le chart si le contenu change
  const observer = new MutationObserver(buildChart);
  observer.observe(shadow, { childList: true, subtree: true });
})(shadow);