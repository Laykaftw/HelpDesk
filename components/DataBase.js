import { openDatabase } from 'expo-sqlite';

const db = openDatabase('HelpDesk.db');

db.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS email_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            body TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );`,
        [],
        () => console.log('Email history table created successfully'),
        (_, error) => console.error('Error creating email history table:', error)
    );
});
db.transaction(tx => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Support (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT,
            Phone TEXT,
            Email TEXT
        );`,
        [],
        () => console.log('Support table created successfully'),
        (_, error) => console.error('Error creating Support table:', error)
    );
});



const resetHistory = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM email_history;',
            [],
            () => console.log('Email history reset'),
            (_, error) => console.error('Error resetting email history:', error)
        );
    });
}


const addEmailToHistory = (subject, body) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO email_history (subject, body) VALUES (?, ?);',
            [subject, body],
            () => console.log('Email added to history'),
            (_, error) => console.error('Error adding email to history:', error)
        );
    });
};

const addSupport = (Name, Phone,Email) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Support (Name, Phone,Email) VALUES (?, ?,?);',
            [Name, Phone,Email],
            () => console.log('Support added to List'),
            (_, error) => console.error('Error adding support:', error)
        );
    });
};

const getEmailHistory = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM email_history ORDER BY timestamp DESC;',
            [],
            (_, { rows }) => {
                const emailHistory = rows._array;
                callback(emailHistory);
            },
            (_, error) => console.error('Error retrieving email history:', error)
        );
    });
};
const getSupport = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Support ',
            [],
            (_, { rows }) => {
                const Support = rows._array;
                callback(Support);
            },
            (_, error) => console.error('Error retrieving support list :', error)
        );
    });
};

export { addEmailToHistory, getEmailHistory,resetHistory,addSupport,getSupport };
