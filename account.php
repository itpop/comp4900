<?php 
    include "top.php"; 
    include "global.php";

    $premium = false;
    $months = 0;
    $startDate;
    $endDate;
    $isIOS = checkIOS();
    $url = 'http://www.footballplaybookonline.com/account.php';

    if ($isIOS) {
        header('Location: ' . $url);
    }

    if(!empty($_SESSION['GroupId']) && $_SESSION['GroupId'] > 1) {
        $premium = true;
        $userName = mysqli_real_escape_string($con, $_SESSION['UserName']);

        if(!empty($userName)) {
            $result = mysqli_query($con, "call spPremiumInfo('".$userName."')"); 
            if(mysqli_num_rows($result) == 1) {
                $row = mysqli_fetch_array($result);
                $startDate = $row['SubscriptionStartDate'];
                $months = '+' . $row['SubscriptionLength'] . ' months';
                $endDate = date('Y-m-d', strtotime($startDate . $months)); 
            }
        }
    }
?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" type="text/css" href="css/account.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
    <div class="container text-center" id="mainWrapper">
    <?php include "header.php"; ?>
        <div class="accWrapper">
            <div class="row acc-style">
                <?php if ($premium) { ?>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4>Membership Information for <?php echo $userName ?></h4>
                </div>
                <div class="col-lg-6">
                    <b>Membership Type</b>
                </div>
                <div class="col-lg-6">
                    Premium
                </div>
                <div class="col-lg-6">
                    <b>Start Date</b>
                </div>
                <div class="col-lg-6">
                    <?php echo $startDate; ?>
                </div>
                <div class="col-lg-6">
                    <b>Expiration Date</b>
                </div>
                <div class="col-lg-6">
                    <?php echo $endDate; ?>
                </div>
                <?php } else { ?>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h4>Become a premium member</h4>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    Benefits of a premium membership include:
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <ul>
                        <li>Increased functionality including:
                            <ul><li>player labels</li>
                            <li>different line types </li>
                            <li> different line endings </li>
                            <li> multiple colors for lines and players </li></ul></li>
                        <li>Easy to use playbook to access and edit all of your plays</li>
                        <li>More play templates </li>
                        <li>No advertisements</li>
                    </ul>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <a href="http://www.footballplaybookonline.com/account.php">Access Premium Features Now!</a>
                </div>
                <?php } ?>
            </div>
        </div>

    </div>
    <?php include "footer.php"; ?>
</body>
</html>