-- NoName Group - Fred Yang
-- Playbook Stored Procedures

USE playbookdatabase;

/*  
-- PROCEDURE spUserUpdate
-- creates/updates user info
-- Params:
--  memberId - the specified member id
--  memberName - input member name
--  passwd - input password
--  passwd1 - input new password
--  emailAddress - input email address
--  groupId - input group id
*/
drop procedure if exists spUserUpdate;
create procedure spUserUpdate(
    memberId        int,
    memberName      varchar(30),
    passwd          varchar(32),
    passwd1         varchar(32),
    emailAddress    varchar(50),
    groupId         smallint
)
begin
    if not exists (select 1 from smf_members u where u.memberName = memberName) then
        if memberId is null or memberId = 0 then
            insert into `smf_members`(
                memberName, 
                passwd,
                emailAddress,
                ID_GROUP)
            values(
                memberName,
                MD5(passwd),
                emailAddress,
                groupId);
            select last_insert_id() into memberId;
        else
            if not exists (select 1 from smf_members a where a.ID_MEMBER = memberId 
                and a.passwd = MD5(passwd)) then
                set memberId = 1;
            else
                if(passwd1 is null or passwd1 = '') then 
                    update smf_members a
                    set a.emailAddress = emailAddress,
                    a.ID_GROUP = groupId
                    where a.ID_MEMBER = memberId;
                else
                    update smf_members a
                    set a.passwd = MD5(passwd1),
                    a.emailAddress = emailAddress,
                    a.ID_GROUP = groupId
                    where a.ID_MEMBER = memberId;
                end if;
            end if;
        end if;
    end if;

    if memberId is null or memberId = 0 then
        set memberId = 1;
    end if;
    select memberId as memberId;
end;

/*  
-- PROCEDURE spUserInfo
--	Returns user info
-- Params:
--  memberId - the specified member id
*/
drop procedure if exists spUserInfo;
create procedure spUserInfo(
    memberId   int
)
begin
    select memberName, emailAddress, ID_GROUP from smf_members a 
    where a.ID_MEMBER = memberId;
end;

/*  
-- PROCEDURE spUserFindPassword
--  recover password
-- Params:
--  memberName - input member name
--  emailAddress - input email address
--  passwd - input password
*/
drop procedure if exists spUserFindPassword;
create procedure spUserFindPassword(
    memberName    varchar(30),
    emailAddress  varchar(50),
    passwd        varchar(32)
)
begin
    update smf_members a set a.passwd = MD5(passwd) 
    where a.memberName = memberName and a.emailAddress = emailAddress;
end;

/*  
-- PROCEDURE spUserFind
--  Checks if the current user exists based on the 
--  input username and password
-- Params:
--  memberName - input member name
--  passwd - input password
*/
drop procedure if exists spUserFind;
create procedure spUserFind(
    memberName    varchar(30),
    passwd        varchar(32)
)
begin
    select a.ID_MEMBER, a.memberName, a.emailAddress, a.ID_GROUP 
    from smf_members a 
    where a.memberName = memberName 
    and a.passwd = MD5(passwd);
end;

/*  
-- PROCEDURE spUserFindName
--  Checks the availability for member name
-- Params:
--  UserName - input member name
*/
drop procedure if exists spUserFindName;
create procedure spUserFindName(
    memberName  varchar(30)
)
begin
    select 1 from smf_members a where a.memberName = memberName;
end;

/*  
-- PROCEDURE spUserIdByUserName
--  gets ID_MEMBER by member name
-- Params:
--  memberName - input member name
-- Outputs:
--  ID_MEMBER
*/
drop procedure if exists spUserIdByUserName;
create procedure spUserIdByUserName(
    memberName  varchar(30)
)
begin
    select a.ID_MEMBER from smf_members a where a.memberName = memberName;
end;

/*  
-- PROCEDURE spUserEmailByUserName
--  gets email by member name
-- Params:
--  memberName - input member name
-- Outputs:
--  email address
*/
drop procedure if exists spUserEmailByUserName;
create procedure spUserEmailByUserName(
    memberName  varchar(30)
)
begin
    select a.emailAddress from smf_members a where a.memberName = memberName;
end;

/*  
-- PROCEDURE spContactUpdate
--	stores/updates the current user's contact post
-- Params:
--  contactName - contact name
--  email - user email
--  subject - subject
--  message - content
*/
drop procedure if exists spContactUpdate;
create procedure spContactUpdate(
    contactId   int,
    contactName varchar(30),
    email       varchar(50),
    subject     varchar(50),
    message     text
)
begin
    if contactId is null or contactId = 0 then
        insert into Contact(ContactName, Email, Subject, Message) 
        values(contactName, email, subject, message);
        select last_insert_id() into contactId;
    else
        update Contact a set a.IsReplied = 1 where a.ContactId = contactId;
    end if;
    select IFNULL(contactId, 0) as contactId;
end;

/*  
-- PROCEDURE spPlayFullUpdate
--  stores/updates the current play
-- Params:
--  playName - play name
--  playInfo - play description
--  playJson - JSON formatted play details
--  playbook - playbook category
--  createdBy - creator
--  isValid  - valid flag
*/
drop procedure if exists spPlayFullUpdate;
create procedure spPlayFullUpdate(
    playId      bigint(20),
    playName    varchar(50),
    playInfo    varchar(255),
    playJson    longtext,
    playbook    varchar(50),
    createdBy   varchar(50)
)
begin
    declare tmpId bigint(20);
    if playId is null or playId = 0 then
        select a.PlayId into tmpId from PlayFull a 
            where a.PlayName = playName 
            and a.CreatedBy = createdBy;
        if tmpId is null then
            insert into PlayFull(PlayName, PlayInfo, PlayJson, CreatedBy, CreateDate) 
            values(playName, playInfo, playJson, createdBy, NOW());
            select last_insert_id() into playId;
        else
            update PlayFull a 
            set a.PlayName = playName,
                a.PlayInfo = playInfo,
                a.PlayJson = playJson,
                a.Playbook = playbook,
                a.UpdateDate = NOW()
            where a.PlayId = tmpId;
            select tmpId into playId;
        end if;
    else
        if playbook is null or playbook = '' then
            update PlayFull a 
            set a.PlayName = playName,
                a.PlayInfo = playInfo,
                a.UpdateDate = NOW()
            where a.PlayId = playId;
        else
            update PlayFull a 
            set a.PlayName = playName,
                a.PlayInfo = playInfo,
                a.PlayJson = playJson,
                a.Playbook = playbook,
                a.UpdateDate = NOW()
            where a.PlayId = playId;
        end if;
    end if;
    
    select IFNULL(playId, 0) as playId;
end;

/*  
-- PROCEDURE spPlayFullRemove
--  remove the current play
-- Params:
--  playId - play id
*/
drop procedure if exists spPlayFullRemove;
create procedure spPlayFullRemove(
    playId      bigint(20)
)
begin
    update PlayFull a set a.IsValid = '0' where a.PlayId = playId;
end;

/*  
-- PROCEDURE spPremiumInfo
--	Returns premium info
-- Params:
--  memberName - the specified member name
*/
drop procedure if exists spPremiumInfo;
create procedure spPremiumInfo(
    memberName  varchar(30)
)
begin
    select MemberName, PremiumFlag, SubscriptionStartDate, SubscriptionLength, 
        SubscriptionCost, PromoCode from Premium a 
    where a.MemberName = memberName;
end;


