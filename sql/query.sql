-- 1.

CREATE TABLE Containers (
    ID INT PRIMARY KEY,
    Number INT NOT NULL,
    Type VARCHAR(100),
    Length DECIMAL(10, 2),
    Width DECIMAL(10, 2),
    Height DECIMAL(10, 2),
    Weight DECIMAL(10, 2),
    IsEmpty BIT,
    ArrivalDate TIMESTAMP NOT NULL,
  	UNIQUE(ID)
);

CREATE TABLE Operations (
    ID INT PRIMARY KEY,
    ContainerID INT NOT NULL,
    OperationStartDate timestamp NOT NULL,
    OperationEndDate timestamp NOT NULL,
    OperationType VARCHAR(100),
    OperatorName VARCHAR(100),
    InspectionLocation VARCHAR(100),
  	UNIQUE(ID),
    FOREIGN KEY (ContainerID) REFERENCES Containers(ID)
);


-- 2.

INSERT INTO Containers (ID, Number, Type, Length, Width, Height, Weight, IsEmpty, ArrivalDate)
VALUES 
    (1, 101, 'Type A', 20.5, 8.0, 8.0, 15000.00, 1, '2023-10-01 10:00:00'),
    (2, 102, 'Type B', 40.0, 8.0, 8.0, 25000.00, 0, '2023-10-02 12:30:00'),
    (3, 103, 'Type A', 20.5, 8.0, 8.0, 15000.00, 1, '2023-10-03 11:00:00'),
    (4, 104, 'Type C', 45.0, 8.5, 9.0, 30000.00, 0, '2023-10-04 15:45:00');

INSERT INTO Operations (ID, ContainerID, OperationStartDate, OperationEndDate, OperationType, OperatorName, InspectionLocation)
VALUES 
    (1, 1, '2023-10-01 11:00:00', '2023-10-01 12:00:00', 'Loading', 'John Doe', 'Warehouse A'),
    (2, 2, '2023-10-02 13:00:00', '2023-10-02 14:30:00', 'Unloading', 'Jane Smith', 'Warehouse B'),
    (3, 1, '2023-10-03 09:00:00', '2023-10-03 10:30:00', 'Inspection', 'Alice Johnson', 'Yard C'),
    (4, 3, '2023-10-04 16:00:00', '2023-10-04 17:15:00', 'Loading', 'Bob Brown', 'Warehouse D');

-- 2.1

SELECT 
    CONCAT(
        '{',
        '"ID": ', ID, ', ',
        '"Number": ', Number, ', ',
        '"Type": "', Type, '", ',
        '"Length": ', Length, ', ',
        '"Width": ', width, ', ',
        '"Height": ', Height, ', ',
        '"Weight": ', Weight, ', ',
        '"IsEmpty": ', IsEmpty, ', ',
        '"ArrivalDate": "', DATE_FORMAT(ArrivalDate, '%Y-%m-%d %H:%i:%s'), '"',
        '}'
    ) AS data
FROM Containers;

-- 2.2

SELECT 
    CONCAT(
        '{',
        '"ID": ', ID, ', ',
        '"ContainerID": ', ContainerID, ', ',
        '"OperationStartDate": "', DATE_FORMAT(OperationStartDate, '%Y-%m-%d %H:%i:%s'), '", ',
        '"OperationEndDate": "', DATE_FORMAT(OperationEndDate, '%Y-%m-%d %H:%i:%s'), '", ',
        '"OperationType": "', OperationType, '", ',
        '"OperatorName": "', OperatorName, '", ',
        '"InspectionLocation": "', InspectionLocation, '"',
        '}'
    ) AS data
FROM Operations
WHERE ContainerID = 1;
