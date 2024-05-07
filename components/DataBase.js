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
const resetSupport = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM Support;',
            [],
            () => console.log('Support reseted'),
            (_, error) => console.error('Error resetting support:', error)
        );
    });
}
const deleteSelectedSupport = (id) => {
    db.transaction(
        (tx) => {
            tx.executeSql(
                'DELETE FROM Support WHERE id = ?;',
                [id],
                () => console.log('Support deleted successfully'),
                (_, error) => console.error('Error deleting support:', error)
            );
        },
        null,
        null
    );
};



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

const addSupport = (Name, Phone, Email) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Support (Name, Phone,Email) VALUES (?, ?,?);',
            [Name, Phone, Email],
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
const getSelectedPhone = (ID, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT Phone FROM Support WHERE id=?',
            [ID],
            (_, { rows }) => {
                if (rows.length > 0) {
                    const phone = rows.item(0).Phone;
                    callback(phone);
                } else {
                    callback(null); // No support found with the given ID
                }
            },
            (_, error) => console.error('Error retrieving support phone:', error)
        );
    });
};

const getSelectedEmail = (ID, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT Email FROM Support WHERE id=?',
            [ID],
            (_, { rows }) => {
                if (rows.length > 0) {
                    const email = rows.item(0).Email;
                    callback(email);
                } else {
                    callback(null); // No support found with the given ID
                }
            },
            (_, error) => console.error('Error retrieving support email:', error)
        );
    });
};


const getSupportList = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Support ',
            [],
            (_, { rows }) => {
                const supportItems = rows._array;
                callback(supportItems)
            },
            (_, error) => console.error('Error retrieving support list :', error)
        );
    });
};


const getSelectedSupport = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Support WHERE id = ?',
                [id],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const support = rows.item(0);
                        resolve(support);
                    } else {
                        reject(new Error('Support not found'));
                    }
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

const updateSupport = async (id, name, phone, email) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE Support SET Name = ?, Phone = ?, Email = ? WHERE id = ?',
                [name, phone, email, id],
                () => {
                    resolve();
                    console.log("Updated")
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export { addEmailToHistory, getEmailHistory, resetHistory, addSupport, getSupportList, resetSupport, getSelectedPhone, getSelectedEmail, deleteSelectedSupport, getSelectedSupport, updateSupport };
