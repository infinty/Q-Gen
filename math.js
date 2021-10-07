

var mathProblems = [];

var generateNum = -1;



$("#form-math-lib").submit(function(e){
    console.log(parseInt($("#form-generate-num-content").val()));
    var n = (parseInt($("#form-generate-num-content").val()) == NaN) ? 1 : parseInt($("#form-generate-num-content").val());

    var rawMathProblems = [];
    e.preventDefault();
    questions = $(this).serializeArray();
    var data = {};
    data.ans = NaN;

    $.each(questions, function(index,item){
        data[item.name] = item.value;
      });
    var json = JSON.stringify(data);
    rawMathProblems.push(data);
 
    for(var count = 0; count < n; count++){
        for(var i = 0; i < rawMathProblems.length; i++){
            var exp = rawMathProblems[i].expression;
            rawMathProblems[i].ans = getAns(exp);
            var params = [];
            var cnt = getParamsNum(exp);
            for(var j = 0; j < cnt; j++){
                params.push(commonScope[String.fromCharCode(97 + j)]);
                console.log(String.fromCharCode(97 + j));
            }
                
            var handled = {};
            handled.exp = exp;
            handled.ans = rawMathProblems[i].ans;
            handled.content = myReplace(rawMathProblems[i].content, params);
            mathProblems.push(handled);
        }
        changeRandom(commonScope);
    }

    console.log(mathProblems);
    console.log(rawMathProblems);
    changeRandom(commonScope);
});

function getAns(exp){
    var compiled = math.parse(exp).compile();
    var res = compiled.evaluate(commonScope);
    return res;
}

function getParamsNum(exp){
    var num = 0;
    for(var i = 0; i < exp.length; i++){
        if(exp[i] == 'a' || exp[i] == 'b' || exp[i] == 'c' || exp[i] == 'd' || exp[i] == 'e' || exp[i] == 'f'){
            num++;
        }
    }
    return num;
}

function myReplace(content, params){
    console.log(params);
    var res = "";
    var cnt = 0;
    for(var i = 0; i < content.length; i++){
        
        var charCode = String.fromCharCode(97 + cnt);
        if(content[i] == charCode){
            res += params[cnt];
            cnt++;
        }else{
            res += content[i];
        }
    }
    return res;
}


function changeRandom(commonScope){
    for(var i in commonScope){
        commonScope[i] = Math.floor(10 * Math.random());
    }
}

var commonScope = { 
    a : Math.floor(10 * Math.random()),
    b : Math.floor(10 * Math.random()),
    c : Math.floor(10 * Math.random()),
    d : Math.floor(10 * Math.random()),
    e : Math.floor(10 * Math.random()),
    f : Math.floor(10 * Math.random()),
    g : Math.floor(10 * Math.random())
}





$('#input-wrapper').submit(function(e){
    $(this).attr("disabled",　true);
    e.preventDefault();
    for(var i in mathProblems){
      var tbody = $("#ans-tbody");
      var newRow =$("<tr></tr>");

      var td_content = $("<td>"+ mathProblems[i].content + "</td>");
      var td_ans = $("<td>"+ mathProblems[i].ans + "</td>");
      tbody.append(newRow);
      newRow.append(td_content);
      newRow.append(td_ans);

      var tbody2 = $("#tbody-no-ans");
      var newRow2 = $("<tr></tr>");
      var td_content2 = $("<td>"+ mathProblems[i].content + "</td>");
      tbody2.append(newRow2);
      newRow2.append(td_content2);
      
    }
    $('#ans-table').tableExport({type:'csv'});
    $('#ans-table-no-ans').tableExport({type:'csv'});
  });