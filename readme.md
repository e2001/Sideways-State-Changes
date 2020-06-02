### SidewaysStateChanges



This project showcases a custom solution for updating and rendering Components without causing the entire tree to render. 

This is similar to what Redux dose with connect , This custom solution was build for a React project that did not use Redux 



**What :**  this solution allows to connect deep nested children to particular data in the store without having to prorogate data from the top component to deeper component , once data has changed in a particular path in the sore, the component that registered for that path will get re-rendered with the updated data supplied to it.  



**Running the code** 

to run the 'start' script in package.json , from the main folder run this command : 

```
yarn start
```



### **Design Explanation**     

​            (  guid id's are used as pointers to points in the code  )



the system has two main parts : 



#### Part 1 :  HOC to wrap components 

- The sidewaysConnectedComponent  is a HOC that allows us to connect deep nested children to particular data in the store without having to prorogate data from the top component to deeper component 
- the sidewaysConnectedComponent  HOC will 
  1. Wrap a component , preform all the needed setup against the update service  ( part 2 )
  2. Only render its component once the data at a specified path in the store is changed 
  3. Supply its component with only the portion of the store data that is relevant to that component 
  4. ( optional)  Alert if same property is supplied twice , once from its parent and also from the store 



- **sidewaysConnectedComponent HOC** 

   ```
   {D9702147-4104-A597-6041-B48E8A0F209E}
   ```

   

   the **sidewaysConnectedComponent** HOC takes a mapping object , the mapping object specifies :

  - property name :  the property name ( on the props object ) to map the store data to 
  - path : the path in the store where the desired data is found 

​    

- an example of how Component B is wrapped 2 times, each time specifying a different path in the store 

  Component A uses both of these different B instances   

  ```
  {FA1E08E6-596B-470B-72C3-82B243B3AD5D}
  {8FABE489-75DA-FD24-D8E6-96462BEFC393} 
  ```

  

  the registration to the service (part 2) is done on initial mount of the HOC  ( useEffect hook  )

  ```
   {74A8A234-D924-352A-E160-4FD8FEC54A0E}
  ```

  

  unregister to the service (part 2) is done on unmount ( useEffect hook  )

  ```
  {D3C2F124-95AB-5241-5D2B-30E10F7AB5E7}
  ```

  

  

  #### Part 2 : An update service to listen for store changes and invoke the supplied callback 

  the HOC has registered the component with the update service 

  the update service will : 

  1. listens to any changes in the store , it subscribes to the store to get called when the store changes 

     ```
     {B2961D70-EC18-9F47-7A38-4D1AE81780F1}
     
     ```

     

  2. once a change in the store occurs,  it will preform a diff ( only get the data that changed ) {6EA074AD-BCFB-26A6-D31B-E841871259B7}   it will determine if the data at a given path has changed , and if so it will invoke the callback  {B6A87A06-CB0D-F14C-72AD-C7E5EAD69E7E} that the HOC registered for that path. 

     

     the callback internally will set the state in the HOC and thus evoke a rendering of the component  
     
     ```
{39DE8DF6-307C-3DEB-A925-4B68AEF4801D}
     ```

     

     
   
     Note :  the call to startSidewaysStoreUpdateService is done in bootstrapper.js 
  
  ```
{A0A19840-8C7F-2CFE-AC50-A688E0286D7D}
  ```

   

  
  
  