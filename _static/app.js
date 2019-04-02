

/****************************
    School REportcard Generator
     Eta-network
     http://eta-network.com
     reportcard.js
   version 2.0
******************************/


function roundup(number){
  var newString;
  var numString = number.toString();
  if(numString.lastIndexOf('.') == -1){
    newString=numString;
    return newString;
  }
  var cutoff=numString.lastIndexOf('.') + 1;
  var f1=Number(numString.substring(cutoff,cutoff+1));
  var f2=Number(numString.substring(cutoff+1,cutoff+2));
  if(f2>=5){
    f1+=1;
  }
  if(f1==10){
     numString=numString.substring(0,numString.lastIndexOf('.'));
     var roundNum=Number(numString)+1;
     newString=roundNum.toString();
  }else{
    numString=numString.substring(0,numString.lastIndexOf('.')+1);
    newString=numString+f1;
  }
  return newString;
}

function update_percentage(totalscore) {
  var n = $('.total').length;
  var percent=totalscore / n;
  percent=roundup(percent);
  $('#percent').text(percent + '%'); 
}

function update_totalscore() {
  var total;
  var totalscore = 0;
  $('.total').each(function(i){
    total = $(this).text();
    if (!isNaN(total)) totalscore += Number(total);
  });
  $('#totalscore').text(totalscore);
  update_percentage(totalscore); 
}

function update_total() {
  var row = $(this).parents('.reportRow');
  var test=row.find('.test').val();
  var exam=row.find('.exam').val();
  test=(isNaN(test) || Number(test)>40 || Number(test)<0 )?"N/A":Number(test);
  exam=(isNaN(exam) || Number(exam)>60 || Number(exam)<0 )?"N/A":Number(exam);
  if(test=="N/A"){row.find('.test').val('N/A');}
  if(exam=="N/A"){row.find('.exam').val('N/A');}
  if(test=="N/A" || exam=="N/A"){
    row.find('.total').val("N/A");
  }else{
    var total=test + exam;
    row.find('.total').text(total);
    update_totalscore();
  }
  //var total =Number( row.find('.test').val()) + Number( row.find('.exam').val());
  //isNaN(total) ? row.find('.total').html("N/A") : row.find('.total').html(total);
  

 /** function update_attendace(){
    val odays=$('#sopendays').val();
    val pdays=$('#presentdays').val();
    odays=(isNaN(odays))?"N/A":Number(odays);
    pdays=(isNaN(pdays))?"N/A":Number(pdays);
    if(odays=="N/A"){$('#sopendays').val('N/A');}
  }**/
  
}

function bind() {
  $(".test").blur(update_total);
  $(".exam").blur(update_total);
}

function checkSubject(){
   var str="";
    $('.sub').each(function(i){
       str+=$(this).text();
       str+=" ";
    });
    return str;
}

function rowTemp(subj){
   return '<tr class="reportRow">'+
            '<td class="subject">'+
              '<div class="delete-wpr">'+
                '<span class="sub">'+subj+'</span>'+
                '<a class="delete" href="javascript:;" title="Remove row">X</a>'+
              '</div>'+
            '</td>'+
            '<td><textarea class="test" placeholder="0"></textarea></td>'+
            '<td><textarea class="exam" placeholder="0"></textarea></td>'+
           '<td class="t">'+
             '<span class="total">0</span>'+
            '</td>'+
            '<td><textarea class="position" placeholder="0th"></textarea></td>'+
            '<td><textarea class="remark" placeholder="Excellent"></textarea></td>'+
          '</tr>';
  }

var nOfs=function(){
      var n='<select class="form-control" id="numOfStudent">';
          n+='<option></option>';
      for (var i = 1; i <=40; i++){
        n+='<option>'+' '+i+' '+'</option>';
        }
      n+='</select>';
      return n;
  };

var ster=function(){
   return '<select class="form-control" id="schoolTerm">'+
               '<option></option>'+
               '<option>1st</option>'+
                '<option>2nd</option>'+
                '<option>3rd</option>'+
            '</select>';
       };

var ssess=function(){
    var n='<select class="form-control" id="schoolSession">';
        n+='<option></option>';
    for (var i = 2010; i <=2019; i++){
      n+='<option>'+i+'/'+(i+1)+'</option>';
      }
    n+='</select>';
    return n;
};

var pclasshelper=function(end,txt){
    var t='';
    for (var i = 1; i <=end; i++){
        t+='<option>'+txt+' '+i+' '+'</option>';
        }
        return t;
    };

var pclass=function(){
    var n='<select class="form-control" id="proClass">';
        n+='<option></option>';
        n+=pclasshelper(6,'pri')+pclasshelper(3,'Jss')+pclasshelper(3,'sss');
        n+='</select>';
        return n;
  };





$(document).ready(function(){
    bind();
    //open topbar 
    $('#openToc').click(function (){
        $('#pdfprint').toggleClass('hidden','show');
        $('#nav').slideToggle(); 
      });

  (function(){
   $('#nav2').show();
    $('#topMenu').remove();
    $('body').css({background: 'none'});
    $('.wy-nav-content-wrap').css({background: 'none', 'margin-left': 0});
    $('.wy-nav-side').toggle(); }());

    //end topbar

    //ROWS TEMPLATING AND COMPUTATION
    //Add subjects rows

    $("form").submit(function(e){
        e.preventDefault();
        var subjects=$('#subj').val().toString();
            subjects=subjects.split(',');
         var subtemp="",i;
            if($('.reportRow').length > 0){
               var  stri = checkSubject();
              for(i=0;i<subjects.length;i++){
                if(stri.search(subjects[i]) == -1){
                subtemp+=rowTemp(subjects[i]);}
                }
               $(".reportRow:last").after(subtemp);
                }
            else
                {
                    for(i=0;i<subjects.length;i++){
                    subtemp+=rowTemp(subjects[i]);
                    }
                    $('#reportItems tr:first-child').after(subtemp);
                }
                        bind();
               $('.close').click();
    });

    //end Add subjects

    //print and next template
     $("#print").click(function(){
        window.print();
      });

      $("#next").click(function(){
        $('.student').attr('id','');
        $('#suname').replaceWith('<textarea id="suname"></textarea>');
        $('#pos').replaceWith('<textarea id="suname"></textarea>');
        $('.test').each(function(){
          $(this).replaceWith('<textarea class="test" placeholder="0"></textarea>');
          
        });

        $('.exam').each(function(){
          $(this).replaceWith('<textarea class="exam" placeholder="0"></textarea>');

        });
        
        $('.total').each(function(){
          $(this).replaceWith('<span class="total">0</span>');
        });

        $('.position').each(function(){
          $(this).replaceWith('<textarea class="position" placeholder="0th"></textarea>');
        });

        $('.remark').each(function(){
          $(this).replaceWith('<textarea class="remark" placeholder="Excellent"></textarea>');
        });
        
        $('#totalscore').replaceWith('<td colspan="5" id="totalscore">0</td>');
        $('#percent').replaceWith('<td colspan="5" id="percent">0%</td>')
        bind();
      });
        //end print and next template
           
       // delete subject row
        $("#reportItems").on('click','.delete',function(){
            $(this).parents('.reportRow').remove();
            update_total();
            if ($(".delete").length < 2) $(".delete").hide();
        });
      
      //end delete subject row

      //cancel change and delete logo
      $("#cancel-logo").click(function(){
        $("#logo").removeClass('edit');
      });
      $("#delete-logo").click(function(){
        $("#logo").remove();
      });
      $("#change-logo").click(function(){
        $("#logo").addClass('edit');
        $("#imageloc").val($("#image").attr('src'));
        $("#image").select();
      });
      $("#save-logo").click(function(){
        $("#image").attr('src',$("#imageloc").val());
        $("#logo").removeClass('edit');
      });
    //end of cancel change and delete logo 

      $('#st').on('click','#sterm',function(){
                $(this).parents('td').eq(0).html(ster());
        });

      $('#st').on('change','#schoolTerm',function(){
          var v=$(this).val();
              t= '<textarea id="sterm">'+v+'</textarea>';
              $(this).parents('td').eq(0).html(t);
        });
        
        $('#sic').on('click','#sinclass',function(){
                $(this).parents('td').eq(0).html(nOfs());
          });

        $('#sic').on('change','#numOfStudent',function(){
          var v=$(this).val();
              t= '<textarea id="sinclass">'+v+'</textarea>';
              $(this).parents('td').eq(0).html(t);
        });

        $('#ss').on('click','#ssession',function(){
                $(this).parents('td').eq(0).html(ssess());
        });

        $('#ss').on('change','#schoolSession',function(){
          var v=$(this).val();
              t= '<textarea id="ssession">'+v+'</textarea>';
              $(this).parents('td').eq(0).html(t);
        });

       $('#pcl').on('click','#snewclass',function(){
                $(this).parents('td').eq(0).html(pclass());
        });

        $('#pcl').on('change','#proClass',function(){
          var v=$(this).val();
              t= '<textarea id="snewclass">'+v+'</textarea>';
              $(this).parents('td').eq(0).html(t);
        });

        $(window).load(function(){
          $('#next').click();
        });

});



//DATABASE
  function toast(message){
    toastr.success(message);
   }

  function passtime(time){
      var d=new Date(time),
          yyyy=d.getFullYear(),
          mm=('0'+(d.getMonth()+1)).slice(-2),
          dd=('0'+d.getDate()).slice(-2),
          timeString=dd+'/'+mm+'/'+yyyy;
          return timeString;
    }
    
   function onesubject(onemark){
    return '<tr class="reportRow">'+
            '<td class="subject">'+
              '<div class="delete-wpr">'+
                '<span class="sub">'+onemark.subject+'</span>'+
                '<a class="delete" href="javascript:;" title="Remove row">X</a>'+
              '</div>'+
            '</td>'+
            '<td><textarea class="test">'+onemark.test+'</textarea></td>'+
            '<td><textarea class="exam">'+onemark.exam+'</textarea></td>'+
           '<td class="t">'+
             '<span class="total">'+(Number(onemark.test)+Number(onemark.exam))+'</span>'+
            '</td>'+
            '<td><textarea class="position" placeholder="0th"></textarea></td>'+
            '<td><textarea class="remark" placeholder="Excellent"></textarea></td>'+
          '</tr>';
    }
      
      function removerows(rows){
           if($(''+rows+'').length > 0){
            $(''+rows+'').each(function(){
              $(this).remove();
            });
          }
      }

     function allsubjects(allmarks){
        var allsubjs='';
          allmarks.forEach(function(onemark){
           allsubjs+=onesubject(onemark);
          });
          removerows('.reportRow');
          $('#reportItems tr:first-child').after(allsubjs);
          $('#openToc').click();
          update_totalscore();
          return true;
    }
    
    function report(onereport){
      var one=[
             onereport.name,
             onereport.newclass,
             onereport.total,
             onereport.session,
             onereport.update,
             onereport.term,
             onereport.id];
          return one;
    }

    function reports(allreports){
       allreports.forEach(function(onereport){
            $('#allreports').dataTable().fnAddData(report(onereport));            
          });
          return true;
    }

   
function removerow(id){
  $('#allreports tbody tr').each(function(i){
    if(Number($(this).find('td:last').text())==id){
      $('#allreports').dataTable().fnDeleteRow($(this));
      return true;
    }
  });
}

(function() {
  var db = new Dexie("rcg");
  db.version(1).stores({ reports:'++id,name,term,newclass,numclass,session,nexterm,update,total',
                         marks:'++id,subject,test,exam,stud_id' })
  db.open().then(populate);

    //remove
   function test(){
      db.reports.where('id').equals(9)
        .first(function(a){
          //var f=position(a);
          //alert(f);
          position(a);
        });
    }

    function t(){
      db.reports.where('newclass').equals('sss 1')
        .and(function(r){
          return r.session=='2015/2016'
                  &&r.numclass==17
                  &&r.term=='1st';})
        //.count()
        .primary
        .then(function(num){
          alert(num);
        });
    }
    //remove
    function position(onereport){
       db.reports.where('newclass')
        .equals(onereport.newclass)
        .and(function(reports){
          return reports.numclass==onereport.numclass&&
                 reports.session==onereport.session&&
                 reports.term==onereport.term&&
                 reports.total<onereport.total;})
        .count(function(num){
          $('#pos').val(++num);
        });
        
        //.then(function(numcount){
          //$('#pos').val(++numcount);
        //});  
    }


     function studInfo(onereport){
          $('.student').attr('id',onereport.id);
          $('#suname').val(onereport.name);
          $('#sinclass').val(onereport.numclass);
          $('#sterm').val(onereport.term);
          $('#snewclass').val(onereport.newclass);
          $('#ssession').val(onereport.session);
          $('#sresumedate').val(onereport.nexterm);
          position(onereport);

        }
     // test();
    function populate(){
     return db.reports.toArray()
              .then(reports);
    } 
    
    $("#allreports").on('click','tbody tr',function(e){
        var id=$(this).find('td:last').text();
            id=Number(id);
            db.reports.where('id').equals(id)
              .first(function(onereport){
                studInfo(onereport);
                return db.marks.where('stud_id')
                         .equals(id).toArray(); 
              }).then(allsubjects);

    });

    $('#delete').click(function(){
      var id=$('.student').attr('id');
          id=Number(id);
          if(id==0) return true;
      db.reports.where('id').equals(id).delete()
        .then(function(i){
          return db.marks.where('stud_id').equals(id).delete();
        }).then(function(i){
          removerows('.reportRow');
          $('#next').click();
          removerow(id);
          toast('Successfully Deleted');
        });
    });

    $('#save').click(function(){
        var oldId=Number($('.student').attr('id'));
        var message='Successfully Saved';
        var info={
                name:$('#suname').val(),
                term:($('#sterm').val()!='')?$('#sterm').val():'1st',
                newclass:($('#snewclass').val()!='')?$('#snewclass').val():'pri 1',
                numclass:$('#sinclass').val(),
                session:($('#ssession').val()!='')?$('#ssession').val():'2015/2016',
                nexterm:$('#sresumedate').val(),
                total:$('#totalscore').text(),
                update:passtime(Date.now())
            }; 
            if(info.name==''){toast("Please enter student's name");return true;} 
            if(oldId!=0){info.id=oldId; removerow(oldId); message='Successfully Updated';}
        db.transaction('rw',db.reports,db.marks,function(){   
           db.reports.put(info)
             .then(function(newId){      
               if(oldId==newId){db.marks.where('stud_id').equals(oldId).delete();}  
                $('.reportRow').each(function(i){
                  db.marks.put({
                     subject:$(this).find('.sub').text(), 
                     test:$(this).find('.test').val(), 
                     exam:$(this).find('.exam').val(),
                     stud_id: newId});
                });
                $('.student').attr('id',newId);
                return  db.reports.where('id').equals(newId).toArray();
            }).then(function(row){
                  reports(row);
                  toast(message);
                });
                
          }).catch(function(e){
                toast('An error occur');
            });

          });

}());