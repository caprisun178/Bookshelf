CREATE TABLE USER_Profile (
    ID        SERIAL PRIMARY KEY,
    Username  VARCHAR(128) NOT NULL,
    Password  VARCHAR(128) NOT NULL,
    Email     VARCHAR(360) NOT NULL,
    FirstName VARCHAR(128) NULL, 
    LastName  VARCHAR(128) NULL,
    RowInserted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE BOOK_OpenLibrary (
    ID            SERIAL PRIMARY KEY,
    OpenLibraryID VARCHAR(100) NOT NULL UNIQUE,
    Title         VARCHAR(255) NOT NULL,
    AuthorName    VARCHAR(255),
    CoverID       INT,
    PublishedYear INT, 
);

CREATE TABLE BOOK_SearchTypes(
    ID    PRIMARY KEY, 
    Name  VARCHAR(128) UNIQUE
);

CREATE TABLE BOOK_Tags(
    ID    PRIMARY KEY, 
    Name  VARCHAR(128) UNIQUE
);

CREATE TABLE USER_Books(
    ID        SERIAL PRIMARY KEY,
    ProfileID INT NOT NULL,
    BookID    INT NOT NULL,
    TagID     INT NOT NULL 

    CONSTRAINT fk_user_book_profile
        FOREIGN KEY (ProfileID) REFERENCES USER_Profile(ID) ON DELETE CASCADE,

    CONSTRAINT fk_user_book_book
        FOREIGN KEY (BookID) REFERENCES BOOK_OpenLibray(ID) ON DELETE CASCADE,
    
    CONSTRAINT fk_user_book_tag
        FOREIGN KEY (TagID) REFERENCES BOOK_Tags(ID) ON DELETE CASCADE,

    CONSTRAINT uq_user_book UNIQUE (profile_id, book_id)
);

CREATE TABLE USER_Notes(
    ID            SERIAL PRIMARY KEY,
    UserBookID    INT NOT NULL,
    Notes         TEXT,
    CreatedDate   DATETIME
    CONSTRAINT fk_user_book_notes
        FOREIGN KEY (UserBookID) REFERENCES USER_Books(ID) ON DELETE CASCADE,

);
