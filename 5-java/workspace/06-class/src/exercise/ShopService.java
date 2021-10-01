package exercise;

public class ShopService {
	//static ��ü ���� ����
	private static ShopService obj;
	//�⺻ �����ڸ� private - ��ü ���� ���ϰ�
	private ShopService() {};
	//��ü�� ��ȯ�ϴ� �޼���
	public static ShopService getInstance() {
		//null�϶� (�ʱ����)�϶���
		//��ü�� �ѹ� ������
		//�� �������ʹ� ������ ������ ��ü�� ��ȯ
		if(obj == null) {
			obj = new ShopService();
		}
		return obj;
		
	}
	

}
