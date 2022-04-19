


var parent= document.getElementById('parent');
var leftPane=document.getElementById('leftPane');
var taskHeaderText=document.getElementById('taskHeaderText');
var taskListHolder=document.getElementById('taskListHolder');
var rightPane=document.getElementById('rightPane');
var inputBox=document.getElementById('inputBox');


reload();

todoApp();


function todoApp()
{

var taskHeading=document.createElement('h1');
taskHeading.innerHTML="TASK LIST <br>";
taskHeaderText.appendChild(taskHeading);
var taskPara=document.createElement('h3');
taskPara.innerHTML="Add tasks to your list by typing to the right and pressing enter.<br> You may then view pending task below.";
taskHeaderText.appendChild(taskPara);



var InputBoxContainer=document.createElement('div');
rightPane.appendChild(InputBoxContainer);
var inputBox=document.createElement('textarea');
InputBoxContainer.appendChild(inputBox);
inputBox.setAttribute('id', 'inputBox');
inputBox.placeholder="Type Here...!";

inputBox.addEventListener('keyup', inputEventHandler); // Adding Event Listener on Enter Button 



function inputEventHandler(event)
{

   var inputBox=document.getElementById('inputBox');
   var inputBoxContent=inputBox.value;
   

if(event.code==='Enter')
{
   
    var taskStorage= {

        taskData:"",
        checkBox:false
     
       };

 var taskList=document.createElement('div');
 taskList.setAttribute('id', 'taskList');
 taskList.style.display="flex";
 taskList.style.width="100%";
 taskList.style.marginTop="10px";
 taskList.style.borderBottom="1px dotted black";
 taskListHolder.appendChild(taskList);

 var taskContentBox=document.createElement('div');
 taskContentBox.style.width="70%";
 taskContentBox.style.padding="10px";
 taskList.appendChild(taskContentBox);

var taskContent=document.createElement('h4');
taskContentBox.appendChild(taskContent);
taskContent.innerHTML=inputBoxContent;
taskStorage.taskData=inputBoxContent;
storeTask(taskStorage);
inputBox.value="";


 var taskActionBox=document.createElement('div');
 taskActionBox.style.display="flex";
 taskActionBox.style.width="30%";
 taskList.appendChild(taskActionBox);

 var taskCompleteCheckBox=document.createElement('div');  
 taskCompleteCheckBox.style.width="30%";
 taskCompleteCheckBox.setAttribute('class','checkBoxHolder');
 taskActionBox.appendChild(taskCompleteCheckBox);
 var checkBox=document.createElement('input');
 taskCompleteCheckBox.appendChild(checkBox);
 checkBox.setAttribute('type','checkBox');
 checkBox.setAttribute('class','checkBox');
 if(taskStorage.checkBox)
      {
      taskContent.style.textDecoration="line-through";
      } 
     else
     {
    taskContent.style.textDecoration="none";
     }

 checkBox.addEventListener('click',function(event) // Adding Event Listener To Perform to CheckBox Action
 {

       
       taskStorage.checkBox=!taskStorage.checkBox;
      var oldContent=taskStorage.taskData;
       updateData2(oldContent,taskStorage); 

      if(checkBox.checked)
      {
      taskContent.style.textDecoration="line-through";
      } 
     else
     {
    taskContent.style.textDecoration="none";
     }
   
 });
 
 
 var taskEdit=document.createElement('div');
 taskActionBox.appendChild(taskEdit);
 taskEdit.style.width="35%";
 taskEdit.innerHTML='Edit';
 taskEdit.setAttribute('class','BTN');
 taskEdit.style.cursor="pointer";
taskEdit.addEventListener('click',function(event) // Adding Event Listener To Perform Edit Functionality
{

   var editedContent=prompt("Enter the content to update the task");
  
    var ele1=event.target.parentNode;
    var ele2=ele1.parentNode.children[0];
    var ele3=ele2.children[0];
         
     var oldContent=taskStorage.taskData;
     taskStorage.taskData=editedContent;
     updateData2(oldContent,taskStorage);
    ele3.innerHTML=editedContent;


});


 var taskDelete=document.createElement('div');
 taskActionBox.appendChild(taskDelete);
 taskDelete.style.width="35%";
 taskDelete.innerHTML="Delete";
 taskDelete.setAttribute('class','BTN');
 taskDelete.style.cursor="pointer";
taskDelete.addEventListener('click',function(event)  // Adding Event Listener To Perform Delete Operation
{

    var ele1=event.target.parentNode;
    var ele2=ele1.parentNode.children[0];
    var ele3=ele2.children[0];
    var taskText=ele3.innerHTML;
    var oldContent=taskStorage.taskData;
    deleteTaskData(oldContent,taskStorage);

   var removeTaskList =event.target.parentNode.parentNode
   var taskListParent=event.target.parentNode.parentNode.parentNode;
   taskListParent.removeChild(removeTaskList);  

});
 

}

}

}


function storeTask(taskStorage)
{
  var allTasks= fetchTask();
  allTasks.push(taskStorage);
  localStorage.setItem('taskStorageDB',JSON.stringify(allTasks));

}

function updateData2(oldContent, taskStorage)
{
    var allTask=fetchTask();
      var updatedTask= allTask.map(function(task){
           if(task.taskData===oldContent)
           {
               return taskStorage;
           }
           return task;
       }); 
      localStorage.setItem('taskStorageDB', JSON.stringify(updatedTask));

}


function deleteTaskData(oldContent, taskStorage)
{
    var allTask=fetchTask();
      var updatedTask= allTask.filter(function(task){
           if(task.taskData===oldContent)
           {
               return false;
           }
           return true;
       }); 
      localStorage.setItem('taskStorageDB', JSON.stringify(updatedTask));

}

function fetchTask()
{
    var taskData=localStorage.getItem('taskStorageDB');
    if(taskData!==null)
    {
       var task=JSON.parse(taskData);
    }
    else
    {
        var task=[];
    }
    return task;
}


function reload()
{

var allTasks=fetchTask();

allTasks.forEach(function(taskStorage)
{
   


    var taskList=document.createElement('div');
    taskList.setAttribute('id', 'taskList');
    taskList.style.display="flex";
    taskList.style.width="100%";
    taskList.style.marginTop="10px";
    taskList.style.borderBottom="1px dotted black";
    taskListHolder.appendChild(taskList);
   
    var taskContentBox=document.createElement('div');
    taskContentBox.style.width="70%";
    taskContentBox.style.padding="10px";
    taskList.appendChild(taskContentBox);
   
   var taskContent=document.createElement('h4');
   taskContentBox.appendChild(taskContent);
   taskContent.innerHTML=taskStorage.taskData;
   
   
    var taskActionBox=document.createElement('div');
    taskActionBox.style.display="flex";
    taskActionBox.style.width="30%";
    taskList.appendChild(taskActionBox);
   
    var taskCompleteCheckBox=document.createElement('div');  
    taskCompleteCheckBox.style.width="30%";
    taskCompleteCheckBox.setAttribute('class','checkBoxHolder');
    taskActionBox.appendChild(taskCompleteCheckBox);
    var checkBox=document.createElement('input');
    taskCompleteCheckBox.appendChild(checkBox);
    checkBox.setAttribute('type','checkBox');
    checkBox.setAttribute('class', 'checkBox');
    if(taskStorage.checkBox)
         {
         taskContent.style.textDecoration="line-through";
         checkBox.checked=true;
         } 
        else
        {
       taskContent.style.textDecoration="none";
        }
   
    checkBox.addEventListener('click',function(event) // Adding Event Listener To Perfrom CheckBox Action
    {
   
          
          taskStorage.checkBox=!taskStorage.checkBox;
         var oldContent=taskStorage.taskData;
          updateData2(oldContent,taskStorage); 
   
         if(checkBox.checked)
         {
         taskContent.style.textDecoration="line-through";
         } 
        else
        {
       taskContent.style.textDecoration="none";
        }
      
    });
    
    
    var taskEdit=document.createElement('div');
    taskActionBox.appendChild(taskEdit);
    taskEdit.style.width="35%";
    taskEdit.innerHTML='Edit';
    taskEdit.setAttribute('class','BTN');
    taskEdit.style.cursor="pointer";
   taskEdit.addEventListener('click',function(event) // Adding Event Listener To Perform Edit Functionality
   {
   
      var editedContent=prompt("Enter the content to update the task");
     
       var ele1=event.target.parentNode;
       var ele2=ele1.parentNode.children[0];
       var ele3=ele2.children[0];
            
        var oldContent=taskStorage.taskData;
        taskStorage.taskData=editedContent;
        updateData2(oldContent,taskStorage);
       ele3.innerHTML=editedContent;
   
   
   });
   
   
    var taskDelete=document.createElement('div');
    taskActionBox.appendChild(taskDelete);
    taskDelete.style.width="35%";
    taskDelete.innerHTML="Delete";
    taskDelete.setAttribute('class','BTN');
    taskDelete.style.cursor="pointer";
   taskDelete.addEventListener('click',function(event)  // Adding Event Listener To Perform Delete Operation
   {
   
       var ele1=event.target.parentNode;
       var ele2=ele1.parentNode.children[0];
       var ele3=ele2.children[0];
       var taskText=ele3.innerHTML;
       var oldContent=taskStorage.taskData;
       deleteTaskData(oldContent,taskStorage);
   
      var removeTaskList =event.target.parentNode.parentNode
      var taskListParent=event.target.parentNode.parentNode.parentNode;
      taskListParent.removeChild(removeTaskList);  
   
   });
    


});


}