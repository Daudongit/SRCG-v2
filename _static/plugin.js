
function x_navigation(){
    $(".x-navigation  li > a").click(function(){ 
        var li = $(this).parent('li');        
        var ul = li.parent("ul"); 
        ul.find(" > li").not(li).removeClass("active");      
    });
    
    $(".x-navigation li").click(function(event){
        event.stopPropagation(); 
        var li = $(this);     
            if(li.children("ul").length > 0 || li.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0){
                if(li.hasClass("active")){
                    li.removeClass("active");
                    li.find("li.active").removeClass("active");
                }else
                    li.addClass("active");
                if($(this).hasClass("xn-profile") > 0)
                    return true;
                else
                    return false;
            }                                     
    });
    
}
/* EOF X-NAVIGATION CONTROL FUNCTIONS */


$(document).ready(function(){ 
        
// Bootstrap datepicker
    var feDatepicker = function(){                        
            $(".datepicker").datepicker({format: 'dd/mm/yyyy'});                             
    }// END Bootstrap datepicker
      feDatepicker();
    //Datatables
    var uiDatatable = function(){               
        $("#allreports").dataTable(/*{
            "aoColumnDefs": [
                { "bVisible": false, "aTargets": [ 0 ] },
            
            ]}*/);        
        } 
        uiDatatable();            
    x_navigation();
    //END Datatable 
        
       //multiselect start
        $('#subj').multiSelect({
            selectableHeader: "<input type='text' class='form-control search-input space' autocomplete='off' placeholder='search...'>",
            selectionHeader: "<input type='text' class='form-control search-input space' autocomplete='off' placeholder='search...'>",
            afterInit: function (ms) {
                var that = this,
                    $selectableSearch = that.$selectableUl.prev(),
                    $selectionSearch = that.$selectionUl.prev(),
                    selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                    selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                    .on('keydown', function (e) {
                        if (e.which === 40) {
                            that.$selectableUl.focus();
                            return false;
                        }
                    });

                that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                    .on('keydown', function (e) {
                        if (e.which == 40) {
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
            },
            afterSelect: function () {
                this.qs1.cache();
                this.qs2.cache();
            },
            afterDeselect: function () {
                this.qs1.cache();
                this.qs2.cache();
            }
        });
    //multiselect end
    
});



