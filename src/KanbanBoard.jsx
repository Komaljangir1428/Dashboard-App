import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design UI' },
    'task-2': { id: 'task-2', content: 'Develop backend' },
    'task-3': { id: 'task-3', content: 'Test features' },
    'task-4': { id: 'task-4', content: 'Deploy app' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-3']
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-4']
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn
        }
      }));
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }));
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>KANBAN BOARD</h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='kanban-grid'>
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {provided => (
                  <div
                    className='kanban-column'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{column.title}</h4>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {provided => (
                          <div
                            className='kanban-task'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </main>
  );
}

export default KanbanBoard;