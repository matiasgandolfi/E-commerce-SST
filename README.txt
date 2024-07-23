Descarga de DynamoDB local



Para configurar DynamoDB en su ordenador

https://docs.aws.amazon.com/es_es/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

importante
Para ejecutar la versión 2.5.0 o posterior de DynamoDB en el equipo, debe disponer del Entorno de ejecución de Java (JRE) versión 17.x o posteriores. La aplicación no se ejecuta en versiones anteriores de JRE.

Después de descargar el archivo, extraiga el contenido y copie el directorio extraído en la ubicación que prefiera.

Para iniciar DynamoDB en el ordenador, abra una ventana del símbolo del sistema, vaya al directorio donde ha extraído DynamoDBLocal.jar e ingrese el comando siguiente.

/*---------------------------------Inciar DynamoDb----------------------------------*/




java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
nota







DynamoDB procesa las solicitudes entrantes hasta que lo detiene. Para detener DynamoDB, escriba Ctrl+C en la ventana del símbolo del sistema.

De manera predeterminada, DynamoDB usa el puerto 8000. Si el puerto 8000 no está disponible, este comando genera una excepción.
Para obtener una lista completa de opciones de tiempo de ejecución de DynamoDB, incluida -port, ingrese este comando.







java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -help









Para poder acceder a DynamoDB mediante programación o a través de la AWS Command Line Interface (AWS CLI), debe configurar sus credenciales para habilitar la autorización para sus aplicaciones. DynamoDB descargable requiere cualquier credencial para funcionar, como se muestra en el siguiente ejemplo.



/*-------------------------------Configurar credenciales---------------------------------------------------*/





AWS Access Key ID: "fakeMyKeyId" 
AWS Secret Access Key: "fakeSecretAccessKey"
Default Region Name: "fakeRegion"
Puede utilizar el comando aws configure de la AWS CLI para configurar las credenciales. Para obtener más información, consulte Uso de la AWS CLI.







Comience a escribir aplicaciones. Para acceder a DynamoDB ejecutado localmente con la AWS CLI, use el parámetro --endpoint-url . Por ejemplo, utilice el siguiente comando para enumerar las tablas de DynamoDB.








aws dynamodb list-tables --endpoint-url http://localhost:8000