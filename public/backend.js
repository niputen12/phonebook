
$(document).ready(function(){

	var name = $('.user-name').val();
	var phone = $('.user-number').val();

	localStorage.setItem('name',name);
	localStorage.setItem('phone',phone);

	$('.submit-btn').click(function(){

		$.post('https://joshphonebook.herokuapp.com/new',{

			number: $('.user-number').val(),
			name:$('.user-name').val()
		}).done(function(res){
				console.log(res);
				 $("#wew tr").remove();
				 getrecords();
				$('.user-name').val("");
				$('.user-number').val("");
		});

	});


	



});


function getrecords()
{
var uid;
var uname;
var uphone;
var count=0;
	$.get('http://joshphonebook.herokuapp.com/records',function(data)
						        {
						          console.log(data);
 									$.each(data.data, function(i, d) {
 									uid = data.data[count].id;
 									uname = data.data[count].name;
 									uphone = data.data[count].number;
          							count++;
						             var row='<tr>';
						             $.each(d, function(j, e) {
						                row+='<td>'+e+'</td>';

						             });
						              row+='<td> <button type="button" class = " glyphicon glyphicon-edit btn btn-primary" onclick="edit(\'' + uid + '\',\'' + uphone + '\',\'' + uname + '\');"> EDIT </button> <button type="button" class="btn btn-warning glyphicon glyphicon-remove" onclick="remove(\'' + uid + '\');"> Delete </button></td>';
						             row+='</tr>';
						             $('#wew').append(row);
						          });
						           $('#wew').DataTable();
						          	
						        });


}
function edit(uid,uphone,uname)
{
	$('#edit').modal('show');
	$('.edit-name').val(uname);
	$('.edit-number').val(uphone);

	$('#edit-btn').click(function(){

		  $.ajax({
                url: 'https://joshphonebook.herokuapp.com/updateUser/'+uid,
                type: 'PATCH',
                data: {name: $('.edit-name').val(),
                	   number: $('.edit-number').val(),
                	      _method: "PATCH"},
                success: function(res) {
                	
                	$.alert({
					    title: 'Alert!',
					    content: res.message,
					});
                	 $("#wew tr").remove();
					 getrecords();


                	 	
                }
        });

	});

}
function remove(uid){
	 $.ajax({
                url: 'https://joshphonebook.herokuapp.com/delete/'+uid,
                type: 'delete',
                
                success: function(res) {
					$.alert({
					    title: 'Alert!',
					    content: res.message,
					});
                	 $("#wew tr").remove();
					 getrecords();

			                          	
                }
        });
}


