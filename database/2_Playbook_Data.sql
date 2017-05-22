-- NoName Group - Fred Yang
-- Playbook Data

USE playbookdatabase;

INSERT INTO `smf_members`(memberName, passwd, emailAddress, ID_GROUP) VALUES
('guest','698D51A19D8A121CE581499D7B701668','guest@playbook.ca', 0),
('admin','698D51A19D8A121CE581499D7B701668','admin@playbook.ca', 3),
('test','698D51A19D8A121CE581499D7B701668','test@playbook.ca', 2),
('test1','698D51A19D8A121CE581499D7B701668','test1@playbook.ca', 1);

INSERT INTO `Premium`(MemberName, PremiumFlag, SubscriptionStartDate, SubscriptionLength, SubscriptionCost, PromoCode) VALUES
('test', 1, NOW(), 3, 18.0, 'BCIT');


