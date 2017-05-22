import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.FileReader;
import java.util.ArrayList;

public class XMLParser {
    public static void main (String args[]) {
        try {
            BufferedReader br = new BufferedReader(new FileReader ("3_4_normal.xml"));
            String line;
            ArrayList<String> xList = new ArrayList<>(), yList = new ArrayList<>();
            while ((line = br.readLine ()) != null)
                if (line.contains ("<X>"))
                    xList.add (line);
                else if (line.contains ("<Y>"))
                    yList.add (line);
            for (String temp : xList)
                System.out.println (temp);
            for (String temp1 : yList)
                System.out.println (temp1);
        } catch (Exception ex) {
            
        }
    }
}