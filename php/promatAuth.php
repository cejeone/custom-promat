<?php
 /*$adServer = "kpuranus03.indonesiapower.corp";
            $ldap = ldap_connect($adServer);
            $username = "vendor.simata";
            $password = "InPower2022!";
            // $ldaprdn = 'uid='.$username.',dc=example,dc=com';
    $ldaprdn = 'indonesiapower' . "\\" . $username;

    ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

    $bind = @ldap_bind($ldap, $ldaprdn, $password);
           // ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
            // ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);

            // $bind = @ldap_bind($ldap, $username, $password);

            if ($bind) {
				echo "BERHASIL";
			}
			else
			{
				echo  "GAGAL";
			}
	*/

$username = $_POST['userLdap'];
$password = $_POST['passLdap'];

if($username == "vendor.simata" && $password == "InPower2022!")
{
	echo '{"status":"Success"}';
}
else
{
	echo '{"status":"Failed"}';
}	
?>