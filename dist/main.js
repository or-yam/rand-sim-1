// BAD PRACTICE - not proper MVC. Should be separated to files.
const render = function (todos) {
  $('#todos').empty();

  todos.forEach((todo) => {
    $('#todos').append(`
        <div data-id=${todo.id} class="todo ${
      todo.completed ? 'complete' : ''
    }">
            <i class="fas fa-check-circle"></i>
            <span class=text>${todo.text}</span>
            <span class="delete"><i class="fas fa-trash"></i></span>
        </div>
        `);
  });
};

//add post
const add = function () {
  $.post('/todo', { text: $('#todo-input').val() }, function (todos) {
    render(todos);
    $('#todo-input').val('');
  });
};
//mark done
$('#todos').on('click', '.fa-check-circle', function () {
  const id = $(this).closest('.todo').data().id;
  $.ajax({
    method: 'PUT',
    url: '/todo/' + id,
    success: (todos) => render(todos),
  });
});
//delete
$('#todos').on('click', '.fa-trash', function () {
  const id = $(this).closest('.todo').data().id;
  $.ajax({
    method: 'DELETE',
    url: '/todo/' + id,
    success: (todos) => render(todos),
  });
});

$.get('/todos', (todos) => render(todos));
