<?php
session_start();
if (!isset($_SESSION['tasks'])) {
    $_SESSION['tasks'] = [];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['task']) && !empty(trim($_POST['task']))) {
        $_SESSION['tasks'][] = trim($_POST['task']);
    } elseif (isset($_POST['delete'])) {
        unset($_SESSION['tasks'][$_POST['delete']]);
        $_SESSION['tasks'] = array_values($_SESSION['tasks']);
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h2 class="mb-4">Lista de Tareas</h2>
    <form method="POST" class="mb-3">
        <div class="input-group">
            <input type="text" name="task" class="form-control" placeholder="Nueva tarea">
            <button type="submit" class="btn btn-primary">Agregar</button>
        </div>
    </form>
    <ul class="list-group">
        <?php foreach ($_SESSION['tasks'] as $index => $task): ?>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <?php echo htmlspecialchars($task); ?>
                <form method="POST" style="margin: 0;">
                    <input type="hidden" name="delete" value="<?php echo $index; ?>">
                    <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>