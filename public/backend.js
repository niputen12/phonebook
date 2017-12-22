//=======================================ADDING NEW RECORDS=========================================================
$(document).ready(function()
{
	var name = $('.user-name').val();
	var phone = $('.user-number').val();
	localStorage.setItem('name',name);
	localStorage.setItem('phone',phone);
	$('.submit-btn').click(function()
	{
		if($('.user-name').val()=="" || $('.user-name').val()===null|| $('.user-name').val()===undefined)
		{
			$.alert({
					    title: 'Alert!',
					    content: 'Name Cannot Be blank!'
					});
		}
		else if($('.user-number').val()=="" || $('.user-number').val()===null|| $('.user-number').val()===undefined)
		{
			$.alert({
					    title: 'Alert!',
					    content: 'Number Cannot Be blank!'
					});
		}
		else
		{
			$.post('https://joshphonebook.herokuapp.com/new',
			{
				number: $('.user-number').val(),
				name:$('.user-name').val()
			}).done(function(res)
			{			
				$.alert({
					    title: 'Alert!',
					    content: res.message
					});
					
				    $('#table1 tr').remove();
				  
				   $('#table1').find('thead').append('<tr><th>ID</th><th>Name</th><th>Mobile Number</th><th>Action</th></tr>');
				     getrecords();
					$('.user-name').val("");
					$('.user-number').val("");
			});
		}
	});
});
//========================================GETTING RECORDS FROM DATABASE USING API====================================
function getrecords()
{
var uid;
var uname;
var uphone;
var count=0;
	$.get('http://joshphonebook.herokuapp.com/records',function(data)
						        {						         
 									$.each(data.data, function(i, d) 
 									{
	 									uid = data.data[count].id;
	 									uname = data.data[count].name;
	 									uphone = data.data[count].number;
	          							count++;
							             var row='<tr>';
							             $.each(d, function(j, e) 
							             {
							                row+='<td>'+e+'</td>';
						             	 });
							             row+='<td> <button type="button" class = " glyphicon glyphicon-edit btn btn-primary" onclick="edit(\'' + uid + '\',\'' + uphone + '\',\'' + uname + '\');"> EDIT </button> <button type="button" class="btn btn-warning glyphicon glyphicon-remove" onclick="remove(\'' + uid + '\');"> Delete </button></td>';
							             row+='</tr>';
							             $('#table1').append(row);
						            });
						           		 $('#table1').DataTable();
						          	
						        });
}
//==============================================EDITING RECORDS====================================================
function edit(uid,uphone,uname)
{
	$('#edit').modal('show');
	$('.edit-name').val(uname);
	$('.edit-number').val(uphone);
	$('#edit-btn').click(function()
	{
		if($('.edit-name').val()=="" || $('.edit-name').val()===null|| $('.edit-name').val()===undefined)
		{
			$.alert({
					    title: 'Alert!',
					    content: 'Name Cannot Be blank!'
					});
		}
		else if($('.edit-number').val()=="" || $('.edit-number').val()===null|| $('.edit-number').val()===undefined)
		{
			$.alert({
					    title: 'Alert!',
					    content: 'Number Cannot Be blank!'
					});
		}
		else
		{
			  $.ajax({
                url: 'https://joshphonebook.herokuapp.com/updateUser/'+uid,
                type: 'PATCH',
                data: {name: $('.edit-name').val(),
                	   number: $('.edit-number').val(),
                	      _method: "PATCH"},
                success: function(res) 
                {               	
                	$.alert({
					    title: 'Alert!',
					    content: res.message,
					});
                	 $("#table1 td").remove();
					 getrecords(); 					         	 	
                }
         	});
		}
		
	});
}
//==============================================DELETING RECORDS====================================================
function remove(uid){
	$.confirm({
    title: 'Confirm!',
    content: 'Are you sure you want to Delete?!',
    buttons: {
        confirm: function () {
        	 $.ajax({
                url: 'https://joshphonebook.herokuapp.com/delete/'+uid,
                type: 'delete',                
                success: function(res) {
					$.alert({
					    title: 'Alert!',
					    content: res.message,
					});
                	 $("#table1 tr").remove();
					 getrecords();
					 $('#table1').find('thead').append('<tr><th>ID</th><th>Name</th><th>Mobile Number</th><th>Action</th></tr>');			                          	
                }
        });
           
        },
        cancel: function () {
           
        }
     }
});
	
}


