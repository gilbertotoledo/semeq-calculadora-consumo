function formataMoeda(valor){
    return parseFloat(valor).toFixed(2);
}

function onClickCalcularCustoKwh(){
    let valor_conta = document.getElementById("valor_conta").value;
    let consumo_conta = document.getElementById("consumo_conta").value;

    let custo_kwh = valor_conta / consumo_conta;

    document.getElementById("custo_kwh").value = custo_kwh;
}

let equipamentos = [];

function onClickCadastrar(){
    let quantidade = document.getElementById("quantidade").value;
    let descricao = document.getElementById("descricao").value;
    let consumo_unitario = document.getElementById("consumo_unitario").value;
    let horas_por_dia = document.getElementById("horas_por_dia").value;

    let equipamento = {
        quantidade: quantidade,
        descricao: descricao,
        consumo_unitario: consumo_unitario,
        horas_por_dia: horas_por_dia
    };

    equipamentos.push(equipamento);
    desenhaTabela();
}

function onClickRemoverItem(indice){
    equipamentos.splice(indice, 1);
    desenhaTabela();
}

function desenhaTabela(){
    let custo_kwh = document.getElementById("custo_kwh").value;
    //1kwh = 1000w;

    let table = document.getElementById("equipamentos");
    table.innerHTML = "";
    equipamentos.forEach(function(item, indice){
        let custo_por_hora = custo_kwh * item.consumo_unitario/1000;
        let custo_total = custo_por_hora * item.horas_por_dia * item.quantidade;
        let custo_mensal = custo_total * 30;

        let linhaCriada = table.insertRow();
        linhaCriada.innerHTML = `        
        <td>
            ${item.quantidade}
        </td>
        <td>
            ${item.descricao}
        </td>
        <td>
            ${item.consumo_unitario}
        </td>
        <td>
            ${item.horas_por_dia}
        </td>
        <td>
            ${formataMoeda(custo_por_hora)}
        </td>
        <td>
            ${formataMoeda(custo_mensal)}
        </td>
        <td>
            <button onclick="onClickRemoverItem(${indice})">Remover</button>
        </td>
        `;
    });

    let consumo_mensal_total = equipamentos.reduce(function(soma, item){
        return soma + (item.quantidade * item.consumo_unitario)
    }, 0);

    let custo_mensal_total = equipamentos.reduce(function(soma, item){
        return soma + (item.quantidade * item.consumo_unitario * item.horas_por_dia * 30 * custo_kwh)
    }, 0) / 1000;

    document.getElementById("consumo_mensal_total").innerHTML = consumo_mensal_total;
    document.getElementById("custo_mensal_total").innerHTML = formataMoeda(custo_mensal_total);
}