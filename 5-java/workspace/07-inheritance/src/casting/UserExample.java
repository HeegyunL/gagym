package casting;

public class UserExample {
	public static void main(String[] args) {

		// �Ϲ� �����
		User user = new User();
		user.setId("hong");
		user.setName("ȫ�浿");
		user.setPhone("01012345678");
		user.printUserInfo();
		
		
		// ������
		Admin admin = new Admin();
		// ��ӹ��� User�� �޼��� �� �ʵ带 �״�� ��밡����
		admin.setId("john");
		admin.setName("John Smith");
		admin.setPhone("0212345678");
		admin.printUserInfo();
		// �߰� �ʵ� �� �޼��� ���, �μ���ȣ
//		admin.setDeptNo("10001");
		//������ Admin <- Admin
		Admin admin2 = (Admin) user;
		// ����� ���
		Member member = new Member();
		// ��ӹ��� User�� �޼��� �� �ʵ带 �״�� ��밡����
		member.setId("kim");
		member.setName("������");
		member.setPhone("01009876543");
//		member.printUserInfo();
		// �߰� �ʵ� �� �޼��� ���, ����Ʈ
		member.setPoint(100000);
		member.printUserInfo();
		
		//������ Ÿ�ӿ����� ������ �߻����� ����
		//���� Ÿ�ӿ����� ������ �߻��� Admin <- Member
//		intanceof ������ ���� �ش� Ŭ������ ��ü�� �´��� Ȯ��
//		user��ü�� Admin Ÿ���� �ν������� Ȯ��
		if(user instanceof Admin){
			Admin admin3 = (Admin) user;
		}
		
		
		
//		��� Ŭ�������� �ֻ��� �θ� Object Ŭ������
//		extends�� ���� �ʰ� ������ ���������� extends �Ǿ� �ִ� ����
		Object obj = new Object();
		obj = user;
//		������ ���� ��ü ���� ��ȭ�� �Ҷ��� instanceof ���
		if(obj instanceof Admin) {
		Admin admin4 = (Admin) obj;
		}
	}
}
