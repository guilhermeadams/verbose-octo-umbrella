document.addEventListener('DOMContentLoaded',
    function () {
        const tableBody = document.getElementById('tableBody');


// set  /static/codigos.csv to populate report table.


        fetch("/static/codigos.csv")
            .then(response => response.text())
            .then(() => {

            }
        fetch('')
            .then(response => response.text())
            .then(csvData => {
                // Parse CSV data into an array of objects
                const codesData = csvData.split('\n').map(row => {
                    const [codigo, comentario, impressao_diagnostica, status, estrutura] = row.split(',');
                    return {codigo, comentario, impressao_diagnostica, status, estrutura};
                });

                // Sample data for structures (you can replace this with your actual data)
                const structuresData = [
                    {estrutura: 'Fígado', selectedCode: '', comentarios: ''},
                    {estrutura: 'Vesícula biliar', selectedCode: '', comentarios: ''},
                    {estrutura: 'Baço', selectedCode: '', comentarios: ''},
                    {estrutura: 'Rim direito', selectedCode: '', comentarios: ''},
                    {estrutura: 'Rim esquerdo', selectedCode: '', comentarios: ''},
                    {estrutura: 'Bexiga', selectedCode: '', comentarios: ''},
                    {estrutura: 'Adrenal direita', selectedCode: '', comentarios: ''},
                    {estrutura: 'Adrenal esquerda', selectedCode: '', comentarios: ''},
                    {estrutura: 'Estômago', selectedCode: '', comentarios: ''},
                    {estrutura: 'Intestino delgado', selectedCode: '', comentarios: ''},
                    {estrutura: 'Cólon', selectedCode: '', comentarios: ''},
                    {estrutura: 'Pâncreas', selectedCode: '', comentarios: ''},
                    {estrutura: 'Peritônio', selectedCode: '', comentarios: ''},
                    {estrutura: 'Linfonodos', selectedCode: '', comentarios: ''},
                    {estrutura: 'Útero', selectedCode: '', comentarios: ''},
                    {estrutura: 'Ovários', selectedCode: '', comentarios: ''},
                    {estrutura: 'Outros', selectedCode: '', comentarios: ''},
                    // Add more structures as needed
                ];

                // Function to populate the table
                function populateTable() {
                    tableBody.innerHTML = ''; // Clear existing rows
                    structuresData.forEach(structure => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
              <td class="px-4 py-2">${structure.estrutura}</td>
              <td class="px-4 py-2">
                  <select id="${structure.estrutura}-codes">
                      <option value="">Select Code</option>
                      ${codesData
                            .filter(codeItem => codeItem.estrutura === structure.estrutura)
                            .map(codeItem => `<option value="${codeItem.codigo}">${codeItem.codigo}</option>`)
                            .join('')
                        }
                  </select>
              </td>
              <td class="px-4 py-2"><input type="checkbox" id="${structure.estrutura}-normal"></td>
              <td class="px-4 py-2"><input type="checkbox" id="${structure.estrutura}-anormal"></td>
              <td class="px-4 py-2"><input type="checkbox" id="${structure.estrutura}-nao-visualizada"></td>
              <td class="px-4 py-2"><input type="text" id="${structure.estrutura}-comentarios"></td>
          `;
                        tableBody.appendChild(row);
                    });
                }

                // Call function to populate the table
                populateTable();
            })
            .catch(error => {
                console.error('Error fetching codigos.csv:', error);
            });

        // Function to populate Impressão Diagnóstica (you can replace this with your actual content)
        function populateImpressaoDiagnostica() {
            const impressaoDiagnostica = `
            Imagens ultrassonográficas dentro da normalidade neste exame.
            A análise isolada deste exame não tem valor diagnóstico se não for avaliada em conjunto com os dados clínicos, epidemiológicos e outros exames complementares.
        `;
            document.getElementById('impressaoDiagnostica').textContent = impressaoDiagnostica;
        }

        // Call function to populate Impressão Diagnóstica
        populateImpressaoDiagnostica();
    });
